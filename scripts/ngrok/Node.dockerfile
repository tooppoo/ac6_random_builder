FROM node:22.13.1-slim@sha256:d6d1b3a6f21a25e43d765816281b4a86e5f1ebf843cfae1b14dd0f1c28257cc7

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
