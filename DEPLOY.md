# 🚀 Инструкция по деплою сайта на GitHub Pages

## Шаг 1: Создание репозитория на GitHub

1. Перейдите на [GitHub.com](https://github.com)
2. Нажмите кнопку **"New"** (Новый репозиторий)
3. Заполните данные:
   - **Repository name:** `kanalizacia` (или любое другое имя)
   - **Description:** "Сайт компании БурСтрой - бурение, канализация, ЖБИ изделия"
   - Выберите **Public** (публичный)
   - НЕ добавляйте README, .gitignore (у нас уже есть)
4. Нажмите **"Create repository"**

## Шаг 2: Загрузка файлов в репозиторий

### Вариант A: Через командную строку (рекомендуется)

Откройте терминал в папке проекта и выполните команды:

```bash
# Инициализируем Git репозиторий
git init

# Добавляем все файлы
git add .

# Создаем первый коммит
git commit -m "Initial commit: БурСтрой website"

# Добавляем удаленный репозиторий (замените YOUR_USERNAME и REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/kanalizacia.git

# Переименовываем ветку в main
git branch -M main

# Отправляем код на GitHub
git push -u origin main
```

**Замените:**
- `YOUR_USERNAME` на ваш логин GitHub
- `kanalizacia` на имя вашего репозитория (если другое)

### Вариант B: Через GitHub Desktop (проще для начинающих)

1. Скачайте и установите [GitHub Desktop](https://desktop.github.com/)
2. Откройте GitHub Desktop
3. Нажмите **File → Add Local Repository**
4. Выберите папку с проектом
5. Нажмите **Publish repository**
6. Выберите имя и нажмите **Publish**

### Вариант C: Через веб-интерфейс GitHub

1. На странице вашего нового репозитория нажмите **"uploading an existing file"**
2. Перетащите все файлы проекта (index.html, README.md, .gitignore)
3. Напишите описание коммита: "Initial commit"
4. Нажмите **"Commit changes"**

## Шаг 3: Настройка GitHub Pages

1. Перейдите в ваш репозиторий на GitHub
2. Нажмите на вкладку **"Settings"** (Настройки)
3. В левом меню найдите **"Pages"**
4. В разделе **"Source"** выберите:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Нажмите **"Save"**
6. Подождите 1-2 минуты

## 🎉 Готово!

Ваш сайт будет доступен по адресу:

```
https://YOUR_USERNAME.github.io/kanalizacia/
```

Например:
- Если ваш username: `ivan-petrov`
- Адрес сайта: `https://ivan-petrov.github.io/kanalizacia/`

## 📝 Как обновлять сайт

### После изменений в index.html:

```bash
# Добавляем изменения
git add .

# Создаем коммит с описанием
git commit -m "Обновил контактные данные"

# Отправляем на GitHub
git push
```

Сайт обновится автоматически через 1-2 минуты!

## 🔧 Возможные проблемы и решения

### Проблема: "Сайт не отображается"

**Решение:**
1. Проверьте, что GitHub Pages включен в Settings → Pages
2. Убедитесь, что выбрана ветка `main` и папка `/ (root)`
3. Подождите 5-10 минут (первый деплой может быть медленным)
4. Очистите кеш браузера (Ctrl+F5)

### Проблема: "git: command not found"

**Решение:**
- **Windows:** Установите [Git for Windows](https://git-scm.com/download/win)
- **Mac:** Установите через `brew install git` или Xcode Command Line Tools
- **Linux:** `sudo apt install git` (Ubuntu/Debian) или `sudo yum install git` (CentOS)

### Проблема: "Permission denied (publickey)"

**Решение:**
1. Используйте HTTPS вместо SSH:
   ```bash
   git remote set-url origin https://github.com/YOUR_USERNAME/kanalizacia.git
   ```
2. Или настройте SSH ключ по [инструкции GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

## 🌐 Кастомный домен (опционально)

Если у вас есть свой домен (например, `burstroy.by`):

1. В настройках GitHub Pages введите домен в поле **"Custom domain"**
2. У вашего регистратора доменов добавьте DNS записи:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   
   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   ```
3. Подождите 24-48 часов для обновления DNS

## 📊 Добавление аналитики (опционально)

### Google Analytics:

1. Создайте аккаунт на [analytics.google.com](https://analytics.google.com)
2. Получите код отслеживания
3. Вставьте перед закрывающим тегом `</head>` в index.html:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Яндекс.Метрика:

1. Создайте счетчик на [metrika.yandex.ru](https://metrika.yandex.ru)
2. Вставьте код перед закрывающим тегом `</body>` в index.html

## 💡 Полезные команды Git

```bash
# Посмотреть статус изменений
git status

# Посмотреть историю коммитов
git log --oneline

# Отменить последний коммит (но сохранить изменения)
git reset --soft HEAD~1

# Посмотреть изменения в файлах
git diff

# Создать новую ветку
git checkout -b new-feature

# Переключиться на main ветку
git checkout main
```

## 📞 Нужна помощь?

- 📖 [Документация GitHub Pages](https://docs.github.com/en/pages)
- 📖 [Основы Git](https://git-scm.com/book/ru/v2)
- 💬 Создайте Issue в репозитории

