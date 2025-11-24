FROM node:20-alpine

# Install Chromium for Puppeteer (Alpine version - much lighter)
# Cache buster: 2025-11-24T14:30:43+03:00
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set Puppeteer to use installed Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

# Copy ONLY the airtel-submitter files
COPY package*.json ./
COPY index.js ./

# Install dependencies
RUN npm install --production

# Run the service
CMD ["npm", "start"]
