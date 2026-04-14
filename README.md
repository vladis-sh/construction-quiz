# Отчёт по выполнению

## Запуск проекта

### Требования

- [Node.js](https://nodejs.org/) v18+
- [Yarn](https://yarnpkg.com/) v1.22+
- [PostgreSQL](https://www.postgresql.org/) 

### 1. Настройка переменных окружения

Создайте файл `backend/.env` на основе примера:

```
PORT=<порт сервера>

DB_HOST=<хост базы данных>
DB_PORT=<порт базы данных>
DB_USER=<пользователь>
DB_PASSWORD=<пароль>
DB_NAME=<название базы данных>

DATABASE_URL="postgresql://<пользователь>:<пароль>@<хост>:<порт>/<название базы данных>?schema=public"

```

Создайте файл `frontend/.env` на основе примера:

```
VITE_API_URL=<адрес сервера> 
```



### 2. Установка зависимостей

```bash
# Backend
cd backend
yarn install

# Frontend
cd ../frontend
yarn install
```

### 3. Применение миграций базы данных и заполнение начальными данными

```bash
cd backend
yarn prisma migrate deploy
yarn prisma db seed
```

### 4. Запуск

**Backend** (в одном терминале):

```bash
cd backend
yarn start:dev
```

**Frontend** (в другом терминале):

```bash
cd frontend
yarn dev
```




## Описание

### Что выполнили:

**(09.04.2026)**

- Создание проекта с использованием Vite

- Создали архитектуру проекта с использованием FSD

- Использовали менеджер пакетов yarn

- Заполнили Readme файл

**(10.04.2026)**

- Создание серверной части с использованием NestJS
- Проектирование БД
- Настройка Prisma для работы c БД
- Настройка ESlint и Prettier

**(11.04.2026)**

- Добавлены endpoints для `projects`
- Добавлен модуль `quiz` и связанные с ним endpoints
- Начата реализация компонента `header`
- Добавлена секция `projects` без данных

**(12.04.2026)**

- Добавлена верстка опросного модуля с адаптивным дизайном 
- Сделан базовый функционал

**(13.04.2026)**

- Произвел рефакторинг секции Quiz

**(14.04.2026)**

- Тестирование 

### Что изучили:

**(09.04.2026)**

[Архитектуру FSD](https://fsd.how/ru/docs/get-started/overview/)

Работа с Markdown файлами: [Markdown Guide](https://www.markdownguide.org/), [Github руководство](https://gist.github.com/Jekins/2bf2d0638163f1294637)

**(10.04.2026)**

- **NestJS**
  - [Официальная документация](https://docs.nestjs.com/first-steps)
  - [Prisma + NestJS](https://docs.nestjs.com/recipes/prisma)
  - [Статья](https://vkagklis.medium.com/how-to-build-a-backend-with-nestjs-and-prisma-part-1-23b6bc8cf2d3)
  - [Статья](https://habr.com/ru/articles/837008/)

- **Prisma ORM**
  - [Официальная документация](https://www.prisma.io/docs)
  - [Quickstart](https://www.prisma.io/docs/prisma-orm/quickstart/prisma-postgres)
  - [Статья](https://habr.com/ru/companies/timeweb/articles/665794/)

- **ESLint и Prettier**
  - [Правила ESlint](typescript-eslint.io/rules/)
  - [Правила Prettier](https://prettier.io/docs/options)

**(11.04.2026)**

- **NestJS (dto / Конвейеры )**
  - [Статья](https://habr.com/ru/companies/timeweb/articles/663234/)

**(12.04.2026)**

[Анимации CSS](https://doka.guide/css/animation/) 

**(13.04.2026)**

[React-хуки](https://habr.com/ru/companies/simbirsoft/articles/652321/) 
  
    
**(14.04.2026)**

  [Тестирование 1](https://dev.to/myogeshchavan97/master-react-testing-step-by-step-jest-vitest-react-testing-libraryj-3k60?utm_source=chatgpt.com)
  
  [Тестирование 2](https://vitest.dev/guide/browser/component-testing?utm_source=chatgpt.com)

  [Тестирование 3](https://medium.com/@jackallcock97/unit-testing-with-nestjs-and-jest-a-comprehensive-tutorial-464910f6c6ba)

  [Тестирование 4](https://docs.nestjs.com/fundamentals/testing)

  [Тестирование 5](https://dev.to/ehsaantech/mastering-unit-testing-with-nestjs-37g9)

  [Тестирование 6](https://dev.to/kevinccbsg/react-testing-setup-vitest-typescript-react-testing-library-42c8)

  [Тестирование 7](https://bogr.dev/blog/react-testing-intro/)
