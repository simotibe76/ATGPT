#!/bin/bash

echo "💻 Lancio build..."
npm run build

echo "📦 Aggiungo modifiche..."
git add .

# Controlla se è stato passato un messaggio personalizzato
if [ -z "$1" ]; then
  msg="🚀 Update automatico dal launcher"
else
  msg="$1"
fi

echo "✍️ Commit con messaggio: $msg"
git commit -m "$msg"

echo "📤 Push su GitHub..."
git push

echo "✅ Fatto! Progetto online aggiornato."
