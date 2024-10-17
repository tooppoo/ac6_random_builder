FROM node:20.18.0-slim@sha256:ec35a66c9a0a275b027debde05247c081f8b2f0c43d7399d3a6ad5660cee2f6a

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
