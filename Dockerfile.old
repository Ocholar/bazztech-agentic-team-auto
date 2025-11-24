FROM node:20-slim AS base

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Copy package files
COPY src/dashboard/package.json src/dashboard/package-lock.json* ./

# Install ALL dependencies (including dev dependencies for Prisma)
RUN npm install

# Copy application code
COPY src/dashboard ./

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js (with dummy DATABASE_URL for build validation)
ENV NEXT_TELEMETRY_DISABLED=1
ARG DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
RUN npm run build

# Production setup
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD ["sh", "-c", "npx prisma db push && npm start"]
