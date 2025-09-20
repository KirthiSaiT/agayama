@echo off
REM Script to start the Flask backend server on Windows

echo Starting Inventory Restock Predictor Flask Backend...

REM Check if virtual environment exists
if not exist "venv_name" (
    echo Creating virtual environment...
    python -m venv venv_name
)

REM Activate virtual environment
echo Activating virtual environment...
call venv_name\Scripts\activate

REM Install requirements
echo Installing requirements...
pip install -r requirements.txt

REM Start the Flask server
echo Starting Flask server on port 5000...
python app.py

pause