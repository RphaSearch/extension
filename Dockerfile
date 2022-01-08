FROM node:12

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

WORKDIR /src/apsc

EXPOSE 3000

CMD [ "node", "app.js" ]
