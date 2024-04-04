FROM node:21.7.2-slim

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
