FROM node:latest

MAINTAINER Daniel Sebuuma <sedzsoft@gmail.com>

RUN mkdir -p /usr/src/app
ADD package.json /usr/src/app
RUN npm install

WORKDIR /usr/src/app
ADD . /usr/src/app

EXPOSE 3000

CMD ["npm", "start"]