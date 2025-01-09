FROM node:22.13.0-slim@sha256:fe64023c6490eb001c7a28e9f92ef8deb6e40e1b7fc5352d695dcaef59e1652d

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
