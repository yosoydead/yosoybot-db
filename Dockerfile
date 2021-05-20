FROM alpine:3.12

RUN apk add --update nodejs npm

RUN node -v

RUN npm -v

WORKDIR /home/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]