FROM node:22.11.0-slim@sha256:4b44c32c9f3118d60977d0dde5f758f63c4f9eac8ddee4275277239ec600950f

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
