FROM node:lts-alpine as base

FROM base as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
COPY . .
RUN pnpm i && pnpm run build

# production stage
FROM base as production-stage
WORKDIR /app
RUN npm i vite
COPY --from=build-stage /app/dist /app/dist
EXPOSE 5000
CMD ["npm", "run", "preview"]
