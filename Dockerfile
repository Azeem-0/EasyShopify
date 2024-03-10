FROM node:alpine3.18

WORKDIR /app

ENV REACT_APP_BACKEND_URL=http://localhost:3001

COPY package.json package.json

RUN yarn install

COPY public public

COPY src src

EXPOSE 3000


CMD [ "yarn" ,"start" ]

