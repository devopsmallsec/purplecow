FROM node:16

WORKDIR /

# dependencies
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]