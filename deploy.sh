#!/bin/bash

echo "========================================"
echo "  БурСтрой - Деплой на GitHub Pages"
echo "========================================"
echo ""

# Цвета для вывода
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Проверка, инициализирован ли Git
if [ ! -d .git ]; then
    echo -e "${YELLOW}[1/5] Инициализация Git репозитория...${NC}"
    git init
    echo ""
else
    echo -e "${GREEN}[1/5] Git репозиторий уже инициализирован ✓${NC}"
    echo ""
fi

# Добавление всех файлов
echo -e "${YELLOW}[2/5] Добавление файлов в Git...${NC}"
git add .
echo ""

# Создание коммита
echo -e "${YELLOW}[3/5] Создание коммита...${NC}"
read -p "Введите описание изменений (или нажмите Enter для 'Update website'): " commit_message
commit_message=${commit_message:-"Update website"}
git commit -m "$commit_message"
echo ""

# Проверка, добавлен ли remote
if ! git remote get-url origin > /dev/null 2>&1; then
    echo -e "${YELLOW}[4/5] Добавление удаленного репозитория...${NC}"
    read -p "Введите ваш GitHub username: " github_username
    read -p "Введите имя репозитория (по умолчанию 'kanalizacia'): " repo_name
    repo_name=${repo_name:-"kanalizacia"}
    git remote add origin "https://github.com/$github_username/$repo_name.git"
    git branch -M main
    echo ""
else
    echo -e "${GREEN}[4/5] Удаленный репозиторий уже настроен ✓${NC}"
    echo ""
fi

# Отправка на GitHub
echo -e "${YELLOW}[5/5] Отправка на GitHub...${NC}"
git push -u origin main
echo ""

if [ $? -eq 0 ]; then
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  ✓ Деплой выполнен успешно!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    
    # Получение URL репозитория
    repo_url=$(git remote get-url origin)
    if [[ $repo_url =~ github\.com[:/]([^/]+)/([^/.]+) ]]; then
        username="${BASH_REMATCH[1]}"
        reponame="${BASH_REMATCH[2]}"
        echo -e "Ваш сайт будет доступен через 1-2 минуты по адресу:"
        echo -e "${GREEN}https://$username.github.io/$reponame/${NC}"
        echo ""
    fi
    
    echo "Не забудьте включить GitHub Pages в настройках репозитория:"
    echo "Settings → Pages → Source: main branch"
    echo ""
else
    echo -e "${RED}========================================${NC}"
    echo -e "${RED}  ✗ Ошибка при деплое${NC}"
    echo -e "${RED}========================================${NC}"
    echo ""
    echo "Возможные решения:"
    echo "1. Убедитесь, что Git установлен: git --version"
    echo "2. Проверьте, что вы авторизованы в GitHub"
    echo "3. Проверьте правильность username и названия репозитория"
    echo ""
fi

