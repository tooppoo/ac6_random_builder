FROM node:20.18.1-slim@sha256:a0196893dffad1f1a5723a8c817b45681402be549a8f196bf9c93a5bc30628e3

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
