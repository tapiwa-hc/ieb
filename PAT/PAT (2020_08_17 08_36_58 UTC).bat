start powershell.exe "cd 'C:\Users\thckwn\Documents\School\MHS\A Block\IT\PAT\Phase 2.5\Express\mysql-api\'; npm run dev"
start powershell.exe "cd 'C:\Users\thckwn\Documents\School\MHS\A Block\IT\PAT\Phase 2.5\Angular\mydro-crude\'; ng serve"
start powershell.exe "code; Start-Service -DisplayName "MySQL80""
pause
start powershell.exe "Stop-Service -DisplayName "MySQL80""