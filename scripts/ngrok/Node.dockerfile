FROM node:20.18.0-slim@sha256:72861852b52c22c47ea8025ac684b843968763948bf34a37e6ebf2edbd44ed5b

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
