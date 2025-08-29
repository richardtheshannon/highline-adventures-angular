FROM node:22.12.0-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Replace environment variables in the production environment file
ARG FIREBASE_API_KEY
ARG GOOGLE_CALENDAR_API_KEY
RUN sed -i "s/\${FIREBASE_API_KEY}/${FIREBASE_API_KEY}/g" src/environments/environment.prod.ts
RUN sed -i "s/\${GOOGLE_CALENDAR_API_KEY}/${GOOGLE_CALENDAR_API_KEY}/g" src/environments/environment.prod.ts

# Build the Angular app
RUN npm run build

# Install serve globally for production
RUN npm install -g serve

# Remove dev dependencies to reduce image size
RUN npm prune --production

# Expose port
EXPOSE $PORT

# Start the application on all interfaces
CMD ["sh", "-c", "serve dist/highline-adventures-angular -s -n -l ${PORT:-8080} --host 0.0.0.0"]