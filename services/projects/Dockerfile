FROM node:alpine

EXPOSE 4222 6222 8222

WORKDIR /usr/src
COPY tsconfig.json tsconfig.json
COPY package.json package.json

RUN yarn install --production=true && \
    yarn global add typescript && \
    yarn cache clean

COPY src src
RUN tsc --build ./tsconfig.json

CMD node ./dist/index.js