FROM node:12-alpine as build

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock ./

USER node

RUN yarn install

COPY --chown=node:node . .

RUN yarn build


FROM node:12-alpine as release

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock ./

USER node

RUN yarn install

COPY --from=build --chown=node:node /home/node/app/build .

CMD yarn migrate:prod && yarn start