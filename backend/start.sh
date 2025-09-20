#!/bin/bash
# Script to start the Flask backend server

echo "Starting Inventory Restock Predictor Flask Backend..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install requirements
echo "Installing requirements..."
pip install -r requirements.txt

# Start the Flask server
echo "Starting Flask server on port 5000..."
python app.py