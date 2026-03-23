# Stage 1: Base
FROM node:18-alpine AS base

# Stage 2: Builder
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy the ENTIRE monorepo into the builder context
COPY . .

# Install dependencies at the root of the monorepo
RUN npm install

# Move into the specific app directory to run the build
WORKDIR /app/apps/website
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Stage 3: Production Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the public folder
COPY --from=builder /app/apps/website/public ./apps/website/public

# In a monorepo, the standalone folder replicates the workspace structure.
# We copy its contents to the root of our runner /app
COPY --from=builder --chown=nextjs:nodejs /app/apps/website/.next/standalone ./

# Copy static files to the correct nested location
COPY --from=builder --chown=nextjs:nodejs /app/apps/website/.next/static ./apps/website/.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Execute the server from its nested path
CMD ["node", "apps/website/server.js"]
