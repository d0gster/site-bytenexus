#!/usr/bin/env python3
import http.server
import socketserver
import os
import socket

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

def find_free_port(start_port=4000, max_port=9000):
    """Encontra uma porta livre para usar"""
    for port in range(start_port, max_port):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('', port))
                return port
        except OSError:
            continue
    return None

if __name__ == "__main__":
    # Verifica se o index.html existe
    if not os.path.exists('index.html'):
        print("❌ Arquivo 'index.html' não encontrado!")
        exit(1)
    
    # Encontra uma porta disponível
    PORT = find_free_port()
    if PORT is None:
        print("❌ Não foi possível encontrar uma porta disponível!")
        exit(1)
    
    # Inicia o servidor
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"🚀 Servidor ByteNexus iniciado em http://localhost:{PORT}")
            print(f"📁 Servindo arquivos do diretório atual")
            print("⏹️  Pressione Ctrl+C para parar o servidor")
            print("")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor parado.")
    except Exception as e:
        print(f"❌ Erro ao iniciar servidor: {e}")