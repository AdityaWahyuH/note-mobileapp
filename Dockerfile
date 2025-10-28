FROM node:16-alpine

# Install Expo CLI globally
RUN npm install -g expo-cli@latest

# Set environment variables
ENV NODE_ENV=development
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV EXPO_NO_TELEMETRY=1

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for Expo)
RUN npm install

# Copy source code
COPY . .

# Expose ports for Expo
EXPOSE 19000 19001 19002 8081

# Start Expo in tunnel mode
CMD ["npx", "expo", "start", "--tunnel"]
