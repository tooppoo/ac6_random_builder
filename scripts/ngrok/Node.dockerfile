FROM node:20.18.0-slim@sha256:967bab29ecde5d59a6dd781054bf9021eee8116068e1f5cb139750b6bc6a75e9

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
