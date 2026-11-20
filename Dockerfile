FROM node:20-alpine
ENV NODE_ENV=production PORT=8080
WORKDIR /app
COPY package.json ./
COPY server ./server
COPY pitch ./pitch
COPY assets ./assets
COPY teil6 ./teil6
USER node
EXPOSE 8080
CMD ["node", "server/server.js"]
