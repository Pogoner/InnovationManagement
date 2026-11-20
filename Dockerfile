FROM node:20-alpine
ENV NODE_ENV=production PORT=8080
WORKDIR /app
COPY package.json ./
COPY server ./server
COPY pitch ./pitch
COPY rechner ./rechner
COPY quellen ./quellen
USER node
EXPOSE 8080
CMD ["node", "server/server.js"]
