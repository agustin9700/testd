FROM gcr.io/puppeteer/puppeteer:23.0.2

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

COPY package.json ./
RUN npm install
COPY . .
CMD ["node", "./bin/www"]