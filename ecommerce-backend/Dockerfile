FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++ sqlite

COPY .env .env
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 1337

# Start the server
CMD ["npm", "run", "develop"]
