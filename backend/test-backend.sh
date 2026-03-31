#!/bin/bash

echo "=================================="
echo "🔍 Diagnóstico Backend - Render"
echo "=================================="
echo ""

BACKEND_URL="https://informaperu-backend.onrender.com"

echo "1️⃣ Probando Health Endpoint..."
echo "URL: $BACKEND_URL/health"
curl -s "$BACKEND_URL/health" | jq . || curl -s "$BACKEND_URL/health"
echo ""
echo ""

echo "2️⃣ Probando API Root..."
echo "URL: $BACKEND_URL/api/"
curl -s "$BACKEND_URL/api/" | jq . || curl -s "$BACKEND_URL/api/"
echo ""
echo ""

echo "3️⃣ Probando Login (esperamos 401 o 422)..."
echo "URL: $BACKEND_URL/api/auth/login"
curl -s -X POST "$BACKEND_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}' | jq . || \
curl -s -X POST "$BACKEND_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}'
echo ""
echo ""

echo "4️⃣ Probando CORS Preflight..."
echo "URL: $BACKEND_URL/api/auth/login (OPTIONS)"
echo "Origin: https://informaperu.com"
curl -v -X OPTIONS "$BACKEND_URL/api/auth/login" \
  -H "Origin: https://informaperu.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  2>&1 | grep -i "access-control"
echo ""
echo ""

echo "=================================="
echo "✅ Diagnóstico completado"
echo "=================================="
echo ""
echo "Interpretación de resultados:"
echo "- Health: debe retornar {\"status\":\"ok\"}"
echo "- API Root: debe retornar mensaje de bienvenida"
echo "- Login: debe retornar 401/422 (no 405!)"
echo "- CORS: debe mostrar Access-Control-Allow-Origin"
