FROM node:22.12.0-slim@sha256:a4b757cd491c7f0b57f57951f35f4e85b7e1ad54dbffca4cf9af0725e1650cd8

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
