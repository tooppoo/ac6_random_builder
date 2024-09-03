FROM node:20.17.0-slim

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
