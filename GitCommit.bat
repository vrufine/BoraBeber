@ECHO OFF

SET MENSAGEM=%1

ECHO %MENSAGEM%

git add .
git commit -m "%MENSAGEM%"
git push