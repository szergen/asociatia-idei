# Build the custom theme
FROM docker.io/node:16-alpine AS theme-builder

# Install theme dependencies
RUN apk add --no-cache python3 make g++

# Copy theme files
COPY --chown=app:app ./theme /openedx/theme
WORKDIR /openedx/theme

# Install npm dependencies and build
RUN npm install && npm run build

# Copy built theme to the main image
FROM scratch AS theme
COPY --from=theme-builder /openedx/theme /openedx/themes/idei-theme

