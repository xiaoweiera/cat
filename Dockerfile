FROM node:lts-alpine as base

FROM base as build-stage
WORKDIR /build
COPY package*.json ./
COPY . .
RUN npm install -g pnpm && pnpm i && pnpm run build

# production stage
FROM base as production-stage
WORKDIR /app
RUN npm i vite
COPY package.json ./
COPY --from=build-stage /build/dist /app/dist
EXPOSE 5000

CMD ["npm", "run", "preview"]
