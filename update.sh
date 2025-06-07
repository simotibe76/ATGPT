#!/bin/bash

cd /home/simone/ATGPT || {
  echo "❌ Cartella del progetto non trovata!"
  read -p "Premi INVIO per uscire..."
  exit 1
}

echo "🧹 Pulizia build vecchia..."
rm -rf dist

echo "🛠️ Build in corso..."
npm run build

echo "📦 Aggiunta modifiche..."
git add .

echo "📝 Commit..."
git commit -m "Aggiornamento automatico"

echo "📤 Push su GitHub..."
git push

echo "✅ Fatto!"
read -p "Premi INVIO per chiudere..."
