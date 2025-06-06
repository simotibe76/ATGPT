#!/bin/bash

echo "🧹 Pulizia build vecchia..."
rm -rf dist

echo "🛠️ Build in corso..."
npm run build

echo "📦 Aggiunta modifiche..."
git add .

echo "📝 Commit..."
git commit -m "⚡️ Aggiornamento automatico via script"

echo "📤 Push su GitHub..."
git push origin main
