FROM node:20.18.0-slim@sha256:2d3b7f5835556f42049cf22c29733eea43666fa3c38c5f08f64686585a8138e4

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
