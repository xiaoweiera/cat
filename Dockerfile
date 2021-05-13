FROM node:lts-alpine as base

FROM base as build-stage
WORKDIR /build
RUN npm i -g pnpm
COPY package*.json pnpm-lock.yaml ./
RUN pnpm i
COPY . .
RUN pnpm run build

# production stage
FROM base as production-stage
WORKDIR /app
RUN npm i vite
COPY package.json ./
COPY --from=build-stage /build/dist /app/dist
EXPOSE 5000

CMD ["npm", "run", "preview"]
