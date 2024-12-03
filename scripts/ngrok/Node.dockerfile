FROM node:22.11.0-slim@sha256:f035ba7ffee18f67200e2eb8018e0f13c954ec16338f264940f701997e3c12da

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
