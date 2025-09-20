from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from prophet import Prophet
from datetime import datetime, timedelta
import io
import os

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # Enable CORS for all API routes

# In-memory storage for processed data
processed_data = {}

def preprocess_data(historical_data, stock_data):
    """Preprocess the uploaded CSV data for Prophet model"""
    try:
        # Convert string data to DataFrames
        df_history = pd.read_csv(io.StringIO(historical_data))
        df_stock = pd.read_csv(io.StringIO(stock_data))
        
        # Handle date formatting
        df_history['date'] = pd.to_datetime(df_history['date'], errors='coerce')
        
        # Drop rows with invalid dates
        df_history.dropna(subset=['date'], inplace=True)
        
        # Correct potential typos in month names, if any
        if 'month' in df_history.columns:
            df_history['month'] = df_history['month'].str.capitalize().replace({'Septembe': 'September'})
        
        # Prophet requires the columns 'ds' and 'y'
        # Let's aggregate sales by date, product, and other features
        df_aggregated = df_history.groupby(
            ['date', 'product_id', 'product_name', 'region', 'season', 'month', 'holiday']
        ).agg(
            quantity_sold=('quantity_sold', 'sum')
        ).reset_index()
        
        # Rename the columns to Prophet's required format
        df_prophet = df_aggregated.rename(columns={'date': 'ds', 'quantity_sold': 'y'})
        
        return df_prophet, df_stock
    except Exception as e:
        raise Exception(f"Error preprocessing data: {str(e)}")

def create_extra_regressors(df_prophet):
    """Create extra regressors for the Prophet model"""
    try:
        # One-hot encode the categorical features
        extra_regressors = pd.get_dummies(df_prophet[['season', 'month', 'region', 'holiday']], drop_first=True)
        df_prophet = pd.concat([df_prophet, extra_regressors], axis=1)
        
        # Get the list of regressor names
        regressor_cols = extra_regressors.columns.tolist()
        
        return df_prophet, regressor_cols, extra_regressors
    except Exception as e:
        raise Exception(f"Error creating extra regressors: {str(e)}")

def predict_restock_needs(df_prophet, df_stock, regressor_cols, extra_regressors):
    """Predict restock needs using Prophet model"""
    try:
        unique_products = df_prophet[['product_id', 'product_name']].drop_duplicates().to_dict('records')
        alerts = []
        
        for product in unique_products:
            product_id = product['product_id']
            product_name = product['product_name']
            
            # Filter data for the current product
            df_product = df_prophet[df_prophet['product_id'] == product_id].copy()
            
            # Get the last known stock level from the separate stock file
            current_stock_row = df_stock[df_stock['product_id'] == product_id]
            if current_stock_row.empty:
                print(f"Warning: No current stock data found for {product_name}. Skipping prediction.")
                continue
            
            last_stock = current_stock_row['current_stock'].iloc[0]
            
            # Skip if we don't have enough data points for the product
            if len(df_product) < 2:
                continue
            
            # Initialize and configure the Prophet model
            m = Prophet(daily_seasonality='auto')
            
            # Add extra regressors to the model
            for col in regressor_cols:
                m.add_regressor(col)
            
            # Fit the model
            m.fit(df_product)
            
            # Create a future dataframe for the next 5 days
            future = m.make_future_dataframe(periods=5, include_history=False)
            
            # Get the last row of the historical dataframe to infer the next values for extra regressors
            last_data_point = df_product.iloc[-1]
            
            # Manually populate the future dataframe with regressor values
            future_data = []
            for i in range(len(future)):
                future_date = future.iloc[i]['ds']
                
                # Determine season and month for future dates
                if 3 <= future_date.month <= 5:
                    season = 'Summer'
                elif 6 <= future_date.month <= 9:
                    season = 'Monsoon'
                elif 10 <= future_date.month <= 11:
                    season = 'Autumn'
                else:
                    season = 'Winter'
                
                # Get the region and holiday from the last data point
                region = last_data_point.get('region', 'Unknown')
                holiday = last_data_point.get('holiday', 'No')
                month = future_date.strftime('%B')
                
                future_data.append({
                    'ds': future_date,
                    'season': season,
                    'month': month,
                    'region': region,
                    'holiday': holiday
                })
            
            future_df = pd.DataFrame(future_data)
            
            # One-hot encode the future regressors
            future_regressors = pd.get_dummies(future_df[['season', 'month', 'region', 'holiday']], drop_first=True)
            future_regressors = future_regressors.reindex(columns=extra_regressors.columns, fill_value=0)
            future = pd.concat([future, future_regressors], axis=1)
            
            # Make the prediction
            forecast = m.predict(future)
            
            # Calculate stock-out date
            stock_level = last_stock
            restock_needed = False
            restock_date = None
            
            # Simulate daily stock reduction
            for index, row in forecast.iterrows():
                predicted_sales = max(0, int(row['yhat']))
                stock_level -= predicted_sales
                
                if stock_level <= 0 and restock_date is None:
                    restock_needed = True
                    # Convert to datetime if it's not already
                    ds_value = row['ds']
                    if isinstance(ds_value, (pd.Timestamp, datetime)):
                        restock_date = ds_value.strftime('%Y-%m-%d')
                    else:
                        # If it's already a string or other type, convert it properly
                        try:
                            restock_date = pd.to_datetime(ds_value).strftime('%Y-%m-%d')
                        except:
                            # Fallback to string representation
                            restock_date = str(ds_value)
            
            # Generate alert if stock-out is predicted
            if restock_needed:
                # Calculate suggested restock quantity based on average sales over last 30 days
                last_30_days_sales = int(df_product.tail(30)['y'].sum())  # Convert to Python int
                avg_daily_sales = last_30_days_sales / min(30, len(df_product))
                suggested_restock = int(avg_daily_sales * 7)  # Suggest a week's worth of stock
                
                alerts.append({
                    'product_name': product_name,
                    'stock_out_date': restock_date,
                    'current_stock': int(last_stock),  # Convert to Python int
                    'suggested_restock': int(suggested_restock)  # Convert to Python int
                })
        
        return alerts
    except Exception as e:
        raise Exception(f"Error predicting restock needs: {str(e)}")

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Inventory Restock Predictor API is running"}), 200

@app.route('/api/predict', methods=['POST'])
def predict_restock():
    try:
        # Get the CSV data from the request
        if 'historical_data' not in request.files or 'stock_data' not in request.files:
            return jsonify({"error": "Both historical_data and stock_data files are required"}), 400
        
        historical_file = request.files['historical_data']
        stock_file = request.files['stock_data']
        
        # Read the CSV data
        historical_data = historical_file.read().decode('utf-8')
        stock_data = stock_file.read().decode('utf-8')
        
        # Preprocess the data
        df_prophet, df_stock = preprocess_data(historical_data, stock_data)
        
        # Create extra regressors
        df_prophet, regressor_cols, extra_regressors = create_extra_regressors(df_prophet)
        
        # Predict restock needs
        alerts = predict_restock_needs(df_prophet, df_stock, regressor_cols, extra_regressors)
        
        # Store processed data for later retrieval
        processed_data['alerts'] = alerts
        processed_data['last_updated'] = datetime.now().isoformat()
        
        return jsonify({
            "message": "Prediction completed successfully",
            "alerts": alerts,
            "count": len(alerts)
        }), 200
    except Exception as e:
        # Log the full traceback for debugging
        import traceback
        error_details = traceback.format_exc()
        print(f"Error in predict_restock: {str(e)}")
        print(f"Traceback: {error_details}")
        return jsonify({"error": str(e), "details": error_details}), 500

@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    """Get the latest restock alerts"""
    if 'alerts' not in processed_data:
        return jsonify({"alerts": [], "message": "No alerts available. Please upload data first."}), 200
    
    return jsonify({
        "alerts": processed_data.get('alerts', []),
        "last_updated": processed_data.get('last_updated', None)
    }), 200

@app.route('/api/inventory', methods=['GET'])
def get_inventory():
    """Get inventory data"""
    # This would typically fetch from a database
    # For now, we'll return a sample structure
    return jsonify({
        "products": [
            {"id": 1, "name": "Wireless Headphones", "current_stock": 45, "status": "safe"},
            {"id": 2, "name": "Smartphone Charger", "current_stock": 22, "status": "urgent"},
            {"id": 3, "name": "Bluetooth Speaker", "current_stock": 18, "status": "warning"}
        ]
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)