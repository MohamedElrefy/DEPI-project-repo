FROM node:alpine3.20

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

ENTRYPOINT  ["npm", "run", "dev"]