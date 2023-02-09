FROM node:lts-alpine

ENV HOST='0.0.0.0'
ENV PORT='3000'

RUN npm install -g pnpm

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package.json ./
COPY pnpm-lock.yaml ./

# install project dependencies
RUN pnpm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN pnpm run build

EXPOSE 3000
CMD ["node", "/app/.output/server/index.mjs"]
