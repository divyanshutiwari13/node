#!/bin/bash

echo "🔄 Deploy script started..."


cd /home/ubuntu/app

echo "📦 Installing dependencies..."
npm install

echo "🚀 Starting/Restarting app with PM2..."
pm2 restart server || pm2 start server.js --name server

echo "✅ Deployment finished."
