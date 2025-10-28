FROM node:16-alpine

ENV NODE_ENV=development
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV EXPO_NO_TELEMETRY=1
ENV CI=1

WORKDIR /app

COPY package*.json ./

# Install dan fix vulnerabilities yang aman
RUN npm install && \
    npm audit fix || true

COPY . .

EXPOSE 19000 19001 19002 19006 8081

CMD ["npx", "expo", "start", "--localhost"]
