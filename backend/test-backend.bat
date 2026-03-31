@echo off
echo ==================================
echo Backend Diagnostic - Render
echo ==================================
echo.

set BACKEND_URL=https://informaperu-backend.onrender.com

echo 1. Testing Health Endpoint...
echo URL: %BACKEND_URL%/health
curl -s "%BACKEND_URL%/health"
echo.
echo.

echo 2. Testing API Root...
echo URL: %BACKEND_URL%/api/
curl -s "%BACKEND_URL%/api/"
echo.
echo.

echo 3. Testing Login (expecting 401 or 422)...
echo URL: %BACKEND_URL%/api/auth/login
curl -s -X POST "%BACKEND_URL%/api/auth/login" -H "Content-Type: application/json" -d "{\"username\":\"test\",\"password\":\"test\"}"
echo.
echo.

echo 4. Testing CORS Preflight...
echo URL: %BACKEND_URL%/api/auth/login (OPTIONS)
echo Origin: https://informaperu.com
curl -v -X OPTIONS "%BACKEND_URL%/api/auth/login" -H "Origin: https://informaperu.com" -H "Access-Control-Request-Method: POST" -H "Access-Control-Request-Headers: Content-Type" 2>&1 | findstr /i "access-control"
echo.
echo.

echo ==================================
echo Diagnostic completed
echo ==================================
echo.
echo Expected results:
echo - Health: should return {"status":"ok"}
echo - API Root: should return welcome message
echo - Login: should return 401/422 (NOT 405!)
echo - CORS: should show Access-Control-Allow-Origin
echo.
pause
