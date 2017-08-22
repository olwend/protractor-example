TIMEOUT 10 /nobreak
START cmd.exe /k "http-server ^"c://NHM-PROJECTS/Bauer-Brothers/app^" --cors --silent -P http://localhost:8080"
TIMEOUT 10 /nobreak
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --incognito --allow-file-access-from-files "http://localhost:8080/index.html"