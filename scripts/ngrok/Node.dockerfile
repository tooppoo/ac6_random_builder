FROM node:21.6.2-slim

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
