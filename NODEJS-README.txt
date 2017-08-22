this kiosk required running on a local server to make the google analytics calls work 
(GA wont work with file:// urls)

1) Install nodeJS from https://nodejs.org - this should automatically install the
    npm command function (node modules install)
   (if the kiosk runs under a locked down kiosk account as in ION - install nodeJS on the kiosk account first)

2) Install http-server globally, open a cmd prompt (right click 'run as administrator' to be sure you have the
   right install permissions), enter 'npm install http-server -g'
   (with the locked down kiosk account - you wont be able to open a CMD prompt so need to login as another user,
    install nodejs on that account, then install http-server as above - once the startup bat file is updated to launch
    nodejs on the kiosk account, you may need to install http-server again there...


3) to run the node http-server and serve your application root (default is localhost:8080) use:  
   http-server c://NHM-Projects/ION-william-smith-kiosk/app --silent


ION Batfile:

TIMEOUT 10 /nobreak
START cmd.exe /k "http-server c://NHM-PROJECTS/William-Smith-maps/app --silent"
TIMEOUT 10 /nobreak
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --incognito --allow-file-access-from-files "http://localhost:8080/index.html"
   
