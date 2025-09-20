# Inventory Restock Predictor

A complete inventory management system with predictive analytics using Facebook Prophet for demand forecasting.

## Project Structure

```
agayma/
├── src/                 # Next.js frontend application
├── backend/             # Flask backend with Prophet model
├── public/              # Static assets
├── .env.local          # Environment variables
└── README.md           # This file
```

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.7 or higher)
- pip (Python package manager)

## Setup Instructions

### 1. Frontend Setup (Next.js)

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:3000

### 2. Backend Setup (Flask with Prophet)

1. Navigate to the backend directory:
```bash
cd backend
```

2. On Windows, run the startup script:
```bash
start.bat
```

3. On macOS/Linux, run:
```bash
chmod +x start.sh
./start.sh
```

The backend API will be available at http://localhost:5000

### 3. Environment Configuration

Make sure the `.env.local` file in the root directory has the correct API URL:
```
MODEL_API_URL=http://localhost:5000/api
```

## Usage

1. Start both the frontend and backend servers
2. Navigate to http://localhost:3000 in your browser
3. Go to the "Inventory" section
4. Upload your historical sales data and current inventory CSV files
5. View restock predictions and alerts in the dashboard

## API Endpoints

### Backend API (Flask)

- `GET /api/health` - Health check endpoint
- `POST /api/predict` - Upload CSV files and generate predictions
- `GET /api/alerts` - Get restock alerts
- `GET /api/inventory` - Get inventory data

## Data Format

### Historical Sales Data CSV
Required columns:
- date (YYYY-MM-DD format)
- product_id
- product_name
- quantity_sold
- region
- season (Summer, Monsoon, Autumn, Winter)
- month
- holiday (Yes/No)

Example:
```csv
date,product_id,product_name,quantity_sold,region,season,month,holiday
2023-01-15,1001,Wireless Headphones,5,North,Summer,January,No
```

### Current Inventory Data CSV
Required columns:
- product_id
- product_name
- current_stock

Example:
```csv
product_id,product_name,current_stock
1001,Wireless Headphones,45
```

## Troubleshooting

### Connection Refused Error
If you see "Failed to load resource: net::ERR_CONNECTION_REFUSED", it means the backend server is not running. Make sure to:

1. Run the backend server using `start.bat` (Windows) or `start.sh` (macOS/Linux)
2. Check that the backend is running on port 5000
3. Verify the MODEL_API_URL in `.env.local` points to the correct address

### Prophet Installation Issues
If you encounter issues installing Prophet:

1. Make sure you have a C++ compiler installed
2. On Windows, you might need to install Microsoft Visual C++ Build Tools
3. On macOS, make sure you have Xcode command line tools
4. On Linux, install build essentials: `sudo apt-get install build-essential`

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Flask, Python
- **Machine Learning**: Facebook Prophet
- **Data Processing**: Pandas, NumPy

## Features

- Upload historical sales data and current inventory
- Predict future stockout dates using Prophet time series forecasting
- Generate restock alerts with suggested quantities
- Dashboard with inventory overview and alerts
- Responsive dark mode UI