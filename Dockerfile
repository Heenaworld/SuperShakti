# Multi-stage production build for SuperShakti Full-Stack Application
# Stage 1: Build frontend and compile backend
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies (including devDependencies required for vite & esbuild)
RUN npm ci

# Copy application source code
COPY . .

# Run production build: Vite frontend -> dist/ & esbuild server -> dist/server.cjs
RUN npm run build

# Stage 2: Production runner
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install production-only dependencies
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled distribution artifacts from builder
COPY --from=builder /app/dist ./dist

# Expose standard container port
EXPOSE 3000

# Health check to ensure Express server is healthy and responding
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start bundled Node.js server
CMD ["node", "dist/server.cjs"]
