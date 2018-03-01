FROM node:8.9
RUN mkdir /code
WORKDIR /code
ADD package.json .
RUN npm install -g yarn && yarn install