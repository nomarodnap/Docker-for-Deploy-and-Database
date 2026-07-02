FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

# Change ownership to the non-root 'node' user for security
RUN chown -R node:node /app

# Switch to the non-root user
USER node

EXPOSE 3000

CMD ["npm", "start"]