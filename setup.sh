#!/bin/bash

# Demo Project Jenkins - Setup Script
# This script helps set up the automation project

echo "🚀 Setting up Demo Project Jenkins Automation..."
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building TypeScript project..."
npm run build

# Test the build
echo "🧪 Testing the build..."
npm start

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Create a GitHub repository and push this code"
echo "2. Set up Jenkins pipeline job (see README.md)"
echo "3. Configure Google Sheets API (see README.md)"
echo "4. Update configuration files with your specific values"
echo ""
echo "📖 For detailed instructions, see README.md"
