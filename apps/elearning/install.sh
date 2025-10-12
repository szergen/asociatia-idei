#!/bin/bash

# Installation script for Asociatia IDEI OpenEDX Platform
# This script helps set up the complete environment

set -e

echo "================================================"
echo "Asociatia IDEI OpenEDX Platform Setup"
echo "================================================"
echo ""

# Check if Tutor is installed
if ! command -v tutor &> /dev/null; then
    echo "❌ Tutor is not installed."
    echo ""
    echo "Please install Tutor first:"
    echo "  pip install 'tutor[full]'"
    echo ""
    echo "Or follow the official guide:"
    echo "  https://docs.tutor.overhang.io/install.html"
    exit 1
fi

echo "✅ Tutor is installed: $(tutor --version)"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo ""
    echo "Please install Node.js 18+ first:"
    echo "  https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm is installed: $(npm --version)"
echo ""

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm install
echo ""

# Build the theme
echo "🎨 Building custom theme..."
cd theme
npm install
npm run build
cd ..
echo ""

# Install the Tutor plugin
echo "🔌 Installing Tutor plugin..."
cd plugins/idei-theme
pip install -e .
cd ../..
echo ""

# Enable the plugin
echo "✅ Enabling idei-theme plugin..."
tutor plugins enable idei-theme
echo ""

# Copy configuration
echo "⚙️  Setting up configuration..."
if [ ! -f "$(tutor config printroot)/config.yml" ]; then
    cp tutor-config.yml "$(tutor config printroot)/config.yml"
    echo "Configuration copied. Please edit $(tutor config printroot)/config.yml"
else
    echo "Configuration already exists at $(tutor config printroot)/config.yml"
fi
echo ""

# Ask if user wants to initialize Tutor now
read -p "Do you want to initialize Tutor now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Initializing Tutor..."
    tutor local quickstart
    echo ""
    echo "================================================"
    echo "✅ Setup Complete!"
    echo "================================================"
    echo ""
    echo "Your OpenEDX platform is now running:"
    echo "  - LMS: http://local.overhang.io:8000"
    echo "  - CMS: http://studio.local.overhang.io:8001"
    echo ""
    echo "Useful commands:"
    echo "  make start       - Start OpenEDX"
    echo "  make stop        - Stop OpenEDX"
    echo "  make logs        - View logs"
    echo "  make help        - See all commands"
else
    echo "================================================"
    echo "✅ Installation Complete!"
    echo "================================================"
    echo ""
    echo "To complete the setup, run:"
    echo "  tutor local quickstart"
    echo ""
    echo "Or use:"
    echo "  make tutor-init"
fi

