FROM node:latest

WORKDIR /app

COPY package.json /app
COPY public /app/public
COPY src /app/src

RUN npm install

CMD ["npm", "start"]