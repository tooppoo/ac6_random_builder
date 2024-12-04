FROM node:22.12.0-slim@sha256:1e3c0d7648ecb3425fc500d3d3abb1b1ff54e324045a898103944cb4eff92451

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
