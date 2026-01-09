#!/bin/bash

echo "=== Student Management System Setup ==="
echo ""
echo "Step 1: Setting up MySQL Database..."
mysql -u root -p < server/config/schema.sql
echo "Database setup complete!"
echo ""
echo "Step 2: Installing backend dependencies..."
cd server
npm install
echo "Backend setup complete!"
echo ""
echo "Step 3: Installing frontend dependencies..."
cd ../client
npm install
echo "Frontend setup complete!"
echo ""
echo "=== Setup Complete! ==="
echo ""
echo "To run the application:"
echo "1. Start the backend: cd server && npm start"
echo "2. Start the frontend: cd client && npm start"
echo ""
echo "The app will open at http://localhost:3000"
