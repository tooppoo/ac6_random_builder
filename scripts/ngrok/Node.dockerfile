FROM node:22.11.0-slim@sha256:6a81ed4d692aeec5d74bfc764df45fca6ce0477a6a6b63905db039dff325bcee

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
