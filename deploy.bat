@echo off
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
set /p commit_message="Введите описание изменений (или нажмите Enter для 'Update website'): "
if "%commit_message%"=="" set commit_message=Update website
git commit -m "%commit_message%"
echo.

REM Проверка, добавлен ли remote
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo [4/5] Добавление удаленного репозитория...
    set /p github_username="Введите ваш GitHub username: "
    set /p repo_name="Введите имя репозитория (по умолчанию 'kanalizacia'): "
    if "%repo_name%"=="" set repo_name=kanalizacia
    git remote add origin https://github.com/!github_username!/!repo_name!.git
    git branch -M main
    echo.
) else (
    echo [4/5] Удаленный репозиторий уже настроен ✓
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
    for /f "tokens=2 delims=/" %%a in ('git remote get-url origin') do set github_url=%%a
    echo https://%github_url%
    echo.
    echo Не забудьте включить GitHub Pages в настройках репозитория:
    echo Settings → Pages → Source: main branch
    echo.
) else (
    echo ========================================
    echo   ✗ Ошибка при деплое
    echo ========================================
    echo.
    echo Возможные решения:
    echo 1. Убедитесь, что Git установлен: git --version
    echo 2. Проверьте, что вы авторизованы в GitHub
    echo 3. Проверьте правильность username и названия репозитория
    echo.
)

pause

