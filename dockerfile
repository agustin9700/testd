FROM ghcr.io/puppeteer/puppeteer:23.0.2

# Set environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (if present)
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Command to run the application
CMD ["node", "./bin/www"]
