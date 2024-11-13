FROM node:20.18.0-slim@sha256:28fbbb764069c698ead61d6a739a7615e8f0e07a4b8fe1473ceca70c1c3d6aaa

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
