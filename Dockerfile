FROM node:alpine3.18

WORKDIR /app

ENV REACT_APP_BACKEND_URL=http://localhost:3001
ENV REACT_APP_PUBLISHED_KEY=pk_test_51OsjM8SFeRn6QdLjxMYwus2yN8pluORuxu6v0N1C8DVleseBgykybVANMmZDrAVhNkt4OyjbaNejxl1Kh2KkowxY00sU4wbw4b

COPY package.json package.json

RUN yarn install

COPY public public

COPY src src

EXPOSE 3000


CMD [ "yarn" ,"start" ]

