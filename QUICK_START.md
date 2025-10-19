# ⚡ Быстрый старт - Деплой за 5 минут

## 🎯 3 простых способа задеплоить сайт

---

## 🖱️ СПОСОБ 1: Автоматический скрипт (САМЫЙ ПРОСТОЙ)

### Для Windows:

1. Откройте папку с проектом
2. Дважды кликните на файл `deploy.bat`
3. Следуйте инструкциям на экране
4. Готово! 🎉

### Для Mac/Linux:

1. Откройте терминал в папке проекта
2. Дайте права на выполнение:
   ```bash
   chmod +x deploy.sh
   ```
3. Запустите скрипт:
   ```bash
   ./deploy.sh
   ```
4. Следуйте инструкциям на экране
5. Готово! 🎉

---

## 💻 СПОСОБ 2: Командная строка (для опытных)

### Шаг 1: Откройте терминал в папке проекта

**Windows:** `Shift + Правый клик` → "Открыть окно PowerShell здесь"  
**Mac/Linux:** Правый клик → "Открыть терминал здесь"

### Шаг 2: Выполните команды

```bash
# 1. Инициализация Git
git init

# 2. Добавление всех файлов
git add .

# 3. Первый коммит
git commit -m "Initial commit: БурСтрой website"

# 4. Добавление GitHub репозитория
# ЗАМЕНИТЕ YOUR_USERNAME на ваш логин GitHub!
git remote add origin https://github.com/YOUR_USERNAME/kanalizacia.git

# 5. Переименование ветки
git branch -M main

# 6. Отправка на GitHub
git push -u origin main
```

### Шаг 3: Включите GitHub Pages

1. Откройте https://github.com/YOUR_USERNAME/kanalizacia
2. Settings → Pages
3. Source: **main branch**, folder: **/ (root)**
4. Save

### Готово! Сайт доступен по адресу:
```
https://YOUR_USERNAME.github.io/kanalizacia/
```

---

## 🌐 СПОСОБ 3: Через веб-интерфейс GitHub (БЕЗ командной строки)

### Шаг 1: Создайте репозиторий

1. Перейдите на https://github.com/new
2. Название: `kanalizacia`
3. Public
4. Create repository

### Шаг 2: Загрузите файлы

1. На странице нового репозитория нажмите **"uploading an existing file"**
2. Перетащите ВСЕ файлы из папки проекта:
   - index.html
   - README.md
   - .gitignore
   - DEPLOY.md
   - deploy.bat
   - deploy.sh
3. Commit message: "Initial commit"
4. Commit changes

### Шаг 3: Включите GitHub Pages

1. Settings → Pages
2. Source: **main branch**
3. Folder: **/ (root)**
4. Save

### Готово! Подождите 2 минуты и откройте:
```
https://ВАШ_USERNAME.github.io/kanalizacia/
```

---

## ❓ Что делать, если что-то пошло не так?

### ❌ Ошибка: "git: command not found"

**Решение:** Установите Git
- Windows: https://git-scm.com/download/win
- Mac: `brew install git` или установите Xcode Command Line Tools
- Linux: `sudo apt install git`

### ❌ Ошибка: "Permission denied"

**Решение:** Авторизуйтесь в GitHub
```bash
git config --global user.name "Ваше Имя"
git config --global user.email "your.email@example.com"
```

### ❌ Сайт не открывается

**Решение:**
1. Подождите 5-10 минут (первый деплой может быть медленным)
2. Проверьте Settings → Pages, что выбран main branch
3. Очистите кеш браузера (Ctrl + F5)

### ❌ Страница показывает только README

**Решение:**
- В Settings → Pages убедитесь, что выбрана папка `/ (root)`, а не `/docs`

---

## 🔄 Как обновить сайт после изменений?

### После редактирования index.html:

```bash
git add .
git commit -m "Описание изменений"
git push
```

Сайт обновится автоматически через 1-2 минуты!

### Или используйте скрипт:

**Windows:** Запустите `deploy.bat`  
**Mac/Linux:** Запустите `./deploy.sh`

---

## 📋 Чек-лист перед деплоем

- [ ] У вас есть аккаунт на GitHub.com
- [ ] Git установлен на компьютере (`git --version`)
- [ ] Вы изменили контактные данные в index.html
- [ ] Вы обновили цены и информацию о компании
- [ ] Файлы находятся в одной папке

---

## 🎨 Что настроить после деплоя?

### 1. Обновите контакты в index.html:
- ☎️ Телефоны
- 📧 Email
- 📍 Адрес
- 💬 WhatsApp/Telegram ссылки

### 2. Добавьте настоящие фотографии:
```bash
# Создайте папку для изображений
mkdir images

# Добавьте фото и обновите пути в HTML
```

### 3. Интегрируйте карту:
- Получите код iframe с Google Maps
- Вставьте в секцию `#contacts`

### 4. Настройте формы обратной связи:
- Используйте Formspree.io
- Или подключите свой backend

### 5. Добавьте аналитику:
- Google Analytics
- Яндекс.Метрика

---

## 🌟 Дополнительные возможности

### Кастомный домен

Если у вас есть свой домен:

1. В Settings → Pages → Custom domain введите: `burstroy.by`
2. У регистратора доменов добавьте DNS записи:
   ```
   Type: A, Name: @, Value: 185.199.108.153
   Type: A, Name: @, Value: 185.199.109.153
   Type: A, Name: @, Value: 185.199.110.153
   Type: A, Name: @, Value: 185.199.111.153
   Type: CNAME, Name: www, Value: YOUR_USERNAME.github.io
   ```

### HTTPS (SSL)

GitHub Pages автоматически добавляет бесплатный SSL сертификат!
✅ Ваш сайт будет работать по HTTPS

---

## 📞 Нужна помощь?

📖 Подробная инструкция: [DEPLOY.md](DEPLOY.md)  
📖 Документация проекта: [README.md](README.md)  
💬 Проблемы с деплоем? Создайте Issue на GitHub

---

## 🎉 Поздравляем!

Ваш сайт теперь в интернете и доступен всему миру!

**Адрес сайта:**
```
https://YOUR_USERNAME.github.io/kanalizacia/
```

Поделитесь ссылкой с клиентами! 🚀

