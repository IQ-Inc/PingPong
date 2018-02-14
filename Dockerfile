# NOTE: if we modify any dependencies in package.json, all users will need to
# re-generate their images. Assuming the image is built using Docker compose,
# this is accomplished using
#
#   $ docker-compose rm # Accept the removal with 'y'
#   $ docker rmi pingpong_api
#   $ docker-compose build
#   $ docker-compose up
#
# Justification: it would be really annoying to always 'npm install' whenever
# you start / restart the development containers. Instead, we bake the
# dependencies into the image, and we rely on the dependencies in the image
# when we create a container. Feel free to overrule this decision! - Ian

FROM node:8.9
RUN mkdir /code
WORKDIR /code
ADD package.json .
RUN npm install
