FROM node:22.11.0-slim@sha256:93b907ca4e433a47bc8ae635accd35f376a031db18d9494c10aaf90db19ebfb8

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
