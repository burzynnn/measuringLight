FROM node:12.16.2-slim

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

CMD ["yarn", "prod"]