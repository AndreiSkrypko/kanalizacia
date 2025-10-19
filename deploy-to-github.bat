@echo off
chcp 65001 >nul
echo ========================================
echo   БурСтрой - Деплой на GitHub Pages
echo ========================================
echo.

REM Проверка, инициализирован ли Git
if not exist .git (
    echo [1/5] Инициализация Git репозитория...
    git init
    echo.
) else (
    echo [1/5] Git репозиторий уже инициализирован ✓
    echo.
)

REM Добавление всех файлов
echo [2/5] Добавление файлов в Git...
git add .
echo.

REM Создание коммита
echo [3/5] Создание коммита...
git commit -m "Initial commit: БурСтрой website - бурение, канализация, ЖБИ"
echo.

REM Проверка, добавлен ли remote
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo [4/5] Добавление удаленного репозитория...
    git remote add origin https://github.com/AndreiSkrypko/kanalizacia.git
    git branch -M main
    echo.
) else (
    echo [4/5] Удаленный репозиторий уже настроен ✓
    git remote set-url origin https://github.com/AndreiSkrypko/kanalizacia.git
    echo.
)

REM Отправка на GitHub
echo [5/5] Отправка на GitHub...
git push -u origin main
echo.

if errorlevel 0 (
    echo ========================================
    echo   ✓ Деплой выполнен успешно!
    echo ========================================
    echo.
    echo Ваш сайт будет доступен через 1-2 минуты по адресу:
    echo https://andreiskrypko.github.io/kanalizacia/
    echo.
    echo ВАЖНО: Включите GitHub Pages в настройках:
    echo 1. Откройте: https://github.com/AndreiSkrypko/kanalizacia/settings/pages
    echo 2. Source: выберите "main" branch
    echo 3. Folder: выберите "/ (root)"
    echo 4. Нажмите "Save"
    echo.
    echo После этого сайт будет доступен!
    echo.
) else (
    echo ========================================
    echo   ✗ Ошибка при деплое
    echo ========================================
    echo.
    echo Возможные решения:
    echo 1. Убедитесь, что Git установлен: git --version
    echo 2. Авторизуйтесь в GitHub через браузер
    echo 3. Попробуйте еще раз
    echo.
)

pause

