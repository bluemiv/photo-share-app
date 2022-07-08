FROM node:16

EXPOSE 4000

RUN mkdir /app
WORKDIR /app

RUN mkdir ./build
COPY ./build ./src
COPY ./graphql ./graphql
COPY ./.env.prod ./.env
COPY ./package.json ./

RUN npm install

ENTRYPOINT ["node", "./src/index.js"]
