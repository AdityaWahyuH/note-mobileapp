FROM node:16-alpine

# Install dependencies untuk Expo
RUN apk add --no-cache git

# Set environment variables
ENV NODE_ENV=development
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV EXPO_NO_TELEMETRY=1
ENV CI=1

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies termasuk @expo/ngrok
RUN npm install && \
    npm install -g @expo/ngrok@latest

# Copy source code
COPY . .

# Expose ports
EXPOSE 19000 19001 19002 8081

# Use npx expo instead of global expo-cli
CMD ["npx", "expo", "start", "--lan"]
