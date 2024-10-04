FROM node:20.17.0-slim@sha256:2394e403d45a644e41ac2a15b6f843a7d4a99ad24be48c27982c5fdc61a1ef17

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
