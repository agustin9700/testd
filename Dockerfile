FROM ghcr.io/puppeteer/puppeteer:23.0.2

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN apt-get update && apt-get install -y \
    google-chrome-stable \
    --no-install-recommends

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

RUN mkdir /tmp/puppeteer_results && chmod 777 /tmp/puppeteer_results

EXPOSE 3000

CMD ["node", "./bin/www"]
