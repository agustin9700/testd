FROM docker pull ghcr.io/puppeteer/puppeteer:23.0.2 


ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /app

COPY package*.json ./
RUN npm PUPPETEER_SKIP_CHROMIUM_DOWNLOAD
COPY . .
CMD ["node", "./bin/www"]