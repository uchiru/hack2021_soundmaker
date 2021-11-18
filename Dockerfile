# Основа образа для сборки приложения
FROM node:14.9.0 as build

# Тут описываем шаги сборки, npm install, npm build и так далее
# Как лучше и почему читать тут - https://docs.docker.com/develop/develop-images/dockerfile_best-practices/

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn

COPY . /app

RUN NODE_ENV=production yarn build

# Основа образа для запуска приложения
FROM uchiru/spa-base:v0.8
# Устанавливаем переменную окружения
ENV BASE_PATH=/
# Копируем результат сборки в образ для запуска
COPY --from=build /app/build /var/www
