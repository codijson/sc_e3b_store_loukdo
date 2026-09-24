FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* ./
RUN yarn install --frozen-lockfile

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN rm -rf .output .nuxt
RUN yarn build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV NITRO_PORT=9050
ENV NITRO_HOST=0.0.0.0

RUN addgroup -S nuxt && adduser -S nuxt -G nuxt
COPY --from=build /app/.output ./.output
USER nuxt

EXPOSE 9050
CMD ["node", ".output/server/index.mjs"]