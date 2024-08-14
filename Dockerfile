FROM ghcr.io/puppeteer/puppeteer:23.0.2

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Create a directory for temporary files with appropriate permissions
RUN mkdir /tmp/puppeteer_results && chmod 777 /tmp/puppeteer_results

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "./bin/www"]