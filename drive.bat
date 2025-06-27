@echo off
echo Starting Server...
start cmd /k "cd server && node server.js"

:WAIT
powershell -command ^
  "$r = Invoke-WebRequest -Uri http://localhost:3001 -UseBasicParsing -TimeoutSec 1; if ($r.StatusCode -eq 200) { exit 0 }" >nul 2>&1
if errorlevel 1 (
    timeout /t 1 >nul
    goto WAIT
)

start http://localhost:3001
