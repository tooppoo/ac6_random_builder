FROM node:20.18.0-slim@sha256:5bba9bfa8c663a8bb5f014d39ea97550946b355b49308c2d1305d706489e8e14

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "run", "dev"]
