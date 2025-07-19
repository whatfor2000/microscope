#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Navigate to the backend directory and set up the Flask environment
cd backend
# Create a virtual environment (optional)
python3 -m venv venv
source venv/bin/activate
# Install Flask and other dependencies
pip install -r requirements.txt

# Run the Flask server in the background
nohup python server.py &

# Navigate to the frontend directory and set up the Next.js environment
cd ../frontend
# Install Node.js dependencies
npm install

# Run the Next.js application
npm run dev

# Print a message indicating that both servers are running
echo "Backend and frontend are running!" 