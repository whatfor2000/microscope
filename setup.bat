@echo off

REM Navigate to the backend directory
cd backend

REM Create a virtual environment (optional)
python -m venv venv
call venv\Scripts\activate

REM Install Flask and other dependencies
pip install -r requirements.txt

REM Run the Flask server in the background
start /B python server.py

REM Navigate to the frontend directory
cd ..\frontend

REM Install Node.js dependencies
npm install

REM Run the Next.js application
npm run dev

REM Print a message indicating that both servers are running
echo Backend and frontend are running!