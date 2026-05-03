# Use Node 18 Alpine for a lightweight image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
# (You will run `npm init -y` and install express, pg, passport, swagger-ui-express locally first)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose API port
EXPOSE 5000

# Start server with nodemon for hot-reloading during dev
CMD ["npx", "nodemon", "src/server.js"]
