Базовый шаблон для новых веб-приложений, включает в себя **create-react-app, react-router-dom, styled-components, typescript, mobx, eslint, prettier, husky, lint-staged**.

## Начальная настройка

Нужно прописать путь, по которому ваше приложение будет доступно на проде. Сделать это нужно в двух местах:

- в переменной `BASE_PATH` в `Dockerfile`
- в свойстве `homepage` в `package.json`

## Доступные команды

- `yarn` — установка всех зависимостей
- `yarn start` — запуск приложения в development-режиме
- `yarn test` — запуск тестов в интерактивном режиме
- `yarn build` — сборка приложения в production-режиме
- `yarn lint` — запуск линтера
