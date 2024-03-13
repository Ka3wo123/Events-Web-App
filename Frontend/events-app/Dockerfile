FROM node:lts-alpine

WORKDIR /app

COPY package.json /app
COPY public /app/public
COPY src /app/src
COPY index.html /app
COPY vite.config.js /app

RUN npm install

CMD ["npm", "start"]