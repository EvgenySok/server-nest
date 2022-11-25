FROM node:lts-alpine AS builder
WORKDIR /app
COPY *.json yarn.lock ./
COPY src ./src
RUN yarn install && yarn build

FROM node:lts-alpine as executor
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production=true 
COPY --from=builder /app/dist ./dist
CMD yarn start:prod
