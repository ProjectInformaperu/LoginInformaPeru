@echo off
echo ========================================
echo Servidor HTTP Local para InformaPeru
echo ========================================
echo.
echo Iniciando servidor en http://localhost:8000
echo Presiona Ctrl+C para detener el servidor
echo.
echo Abre tu navegador en: http://localhost:8000/login.html
echo.

cd /d "%~dp0"
python -m http.server 8000
