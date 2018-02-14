FROM node:8.9
RUN mkdir /code
WORKDIR /code
ADD . /code/
RUN npm install
