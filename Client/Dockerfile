FROM node:alpine

WORKDIR /usr/app

COPY package.json ./
RUN npm install --omit=dev
COPY ./ ./

CMD ["npm","start"]