FROM node:22.12.0-slim@sha256:af534e18ad023c8dc7a420f636a1617f40887a57d4771a08a1ad045b837947d6

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
