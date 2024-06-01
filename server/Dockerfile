FROM node:17-alpine

WORKDIR /server

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 3001

CMD ["yarn", "start"]
