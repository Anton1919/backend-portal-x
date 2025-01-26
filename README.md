# Portal X - Корпоративный портал (Backend)

Бэкенд сервис корпоративного портала для сотрудников банка. Проект включает модули для управления отпусками, документооборота, обучения и корпоративного медиа.

## 🚀 Быстрый старт

### Предварительные требования

Убедитесь, что у вас установлены:

- Node.js (версия 20.11.1 или выше)
- PostgreSQL (версия 15 или выше)
- pgAdmin 4 (опционально)

### Установка и настройка базы данных

1. **Установка PostgreSQL (для macOS)**

```bash
brew install postgresql@15
```

2. **Запуск PostgreSQL**

```bash
# Проверка статуса PostgreSQL
brew services list

# Запуск PostgreSQL если не запущен
brew services start postgresql@15
```

3. **Настройка базы данных**

```bash
# Создание пользователя postgres
psql -U your_username postgres
CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD 'your_password';

# Создание базы данных
CREATE DATABASE "your_database_name";
```

### Установка и запуск проекта

1. **Клонируйте репозиторий**

```bash
git clone https://github.com/Anton1919/backend-portal-x
cd backend-portal-x
```

2. **Установите зависимости**

```bash
npm install
```

3. **Настройте переменные окружения**
   Создайте файл `.env` в корне проекта и заполните своими данными:
```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/your_database_name?schema=public"
PORT=5001
```

4. **Примените миграции и заполните базу данных**

```bash
npx prisma db push
npm run prisma:seed
```

5. **Запустите сервер для разработки**

```bash
npm run start
```

6. **Запустите Prisma Studio (опционально)**

```bash
npm run prisma:studio
```

### Доступ к API

1. **GraphQL Playground**
   Откройте в браузере:

```
http://localhost:5001/graphql
```

2. **Prisma Studio**
   Откройте в браузере (если запущен):

```
http://localhost:5555
```

## 📚 Документация API

Документация доступна в GraphQL Playground по адресу:

```
http://localhost:5001/graphql
```
