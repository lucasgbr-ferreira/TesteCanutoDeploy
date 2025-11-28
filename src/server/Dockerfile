FROM node:20-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production

COPY . .

EXPOSE 3000
CMD ["node", "./src/app.js"]
