#!/bin/bash
echo "🔥 Iniciando servidor ByteNexus..."
echo "💻 Verificando dependências..."

if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 não encontrado! Instale o Python3 primeiro."
    exit 1
fi

echo "✅ Python3 encontrado!"
echo "🚀 Iniciando servidor..."
python3 server.py