TIMEOUT 1 /nobreak
START cmd.exe /k "http-server ^"c://HTML5 PROJECTS/gallery-ION-bauer-brothers/app^" --cors -P http://localhost:8080"
TIMEOUT 1 /nobreak
start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --enable-logging --v=1 --incognito --kiosk --allow-file-access-from-files "http://localhost:8080/index.html"