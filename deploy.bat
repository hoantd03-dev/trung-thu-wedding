@echo off
echo =========================
echo DEPLOYING WEDDING SITE...
echo =========================

git status
git add .
git commit -m "update"
git push

echo.
echo DONE!
pause