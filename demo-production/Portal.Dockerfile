FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
RUN npm ci --ignore-scripts
COPY apps/web apps/web
RUN npm run build --prefix apps/web
FROM node:24-alpine AS portfolio
ENV NODE_ENV=production PORT=3001
WORKDIR /app/apps/web
COPY --from=build /app/node_modules/nodemailer /app/node_modules/nodemailer
COPY --from=build /app/apps/web/dist ./dist
COPY --from=build /app/apps/web/package.json ./package.json
COPY --from=build /app/apps/web/server ./server
COPY --from=build /app/apps/web/lib ./lib
RUN mkdir data && chown node:node data
USER node
EXPOSE 3001
CMD ["node","server/index.mjs"]
FROM nginx:1.28-alpine
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
