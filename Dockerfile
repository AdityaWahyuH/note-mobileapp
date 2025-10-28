# Base image dengan Node.js versi stabil
FROM node:16-alpine as build

# Set environment variables
ENV CI=true
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port untuk Metro Bundler (jika diperlukan untuk development)
EXPOSE 8081

# Command untuk menjalankan aplikasi
CMD ["npm", "start"]
