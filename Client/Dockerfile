FROM node:14-alpine

WORKDIR /usr/app

COPY package.json ./
RUN npm install --only=prod
COPY ./ ./

CMD ["npm","start"]