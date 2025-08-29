FROM node:22.12.0-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the Angular app
RUN npm run build

# Install serve globally for production
RUN npm install -g serve

# Remove dev dependencies to reduce image size
RUN npm prune --production

# Expose port
EXPOSE $PORT

# Start the application
CMD ["sh", "-c", "serve dist/highline-adventures-angular -s -n -l tcp://0.0.0.0:$PORT"]