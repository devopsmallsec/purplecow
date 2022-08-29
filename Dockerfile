FROM node:16

WORKDIR /sites/challenge/PPC

# dependencies
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "nodemon", "server.js" ]