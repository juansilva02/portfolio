FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
RUN npm ci --ignore-scripts
COPY apps/web apps/web
RUN npm run build --prefix apps/web
FROM nginx:1.28-alpine
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
