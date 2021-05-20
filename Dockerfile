FROM alpine

RUN apk add --update nodejs npm

WORKDIR /home/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]