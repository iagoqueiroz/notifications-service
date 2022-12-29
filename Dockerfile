FROM node:18-slim as development

RUN apt-get update && apt-get upgrade
RUN apt-get install openssl

WORKDIR /app

COPY --chown=node:node package*.json .

RUN npm ci

COPY --chown=node:node . .

RUN npx prisma generate

USER node

#############################
# Build Stage for Production
#############################
FROM node:18-slim as build

WORKDIR /app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV=production

RUN npm ci --omit=dev && npm cache clean --force

USER node

#############################
# Final Stage for Production
#############################
FROM node:18-slim as production

WORKDIR /app

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

USER node

CMD ["node", "./dist/src/main.js"]