FROM ghcr.io/puppeteer/puppeteer:23.0.2

# Set environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (if present)
COPY package*.json ./

# Install Node.js dependencies as root
USER root
RUN npm install

# Copy the rest of the application code
COPY . .

# Change ownership of application files to non-root user
RUN chown -R pptruser:pptruser /app

# Switch to non-root user
USER pptruser

# Command to run the application
CMD ["node", "./bin/www"]
