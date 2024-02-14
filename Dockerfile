FROM node:21.6.0-alpine

WORKDIR "/app"

COPY package*.json .
RUN npm i

COPY . .

CMD [ "npm", "run", "start:dev" ]
