FROM node:18-alpine

RUN apk add --no-cache \
    build-base \
    python3 \
    make \
    g++ \
    vips-dev \
    && npm install -g npm@10.8.2

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "start"]
