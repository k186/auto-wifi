# Creating multi-stage build for production
FROM node:18.20.2-alpine as build

# 修改npm 源地址
RUN yarn config set registry https://mirrors.cloud.tencent.com/npm/
RUN yarn config set sass_binary_site https://npmmirror.com/mirrors/node-sass/

# 替换软件包源为阿里云镜像
RUN sed -i -e 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1
ENV NODE_ENV=production

WORKDIR /opt/
COPY package.json yarn.lock ./


RUN yarn global add node-gyp
RUN yarn config set network-timeout 600000 -g && yarn install --production
ENV PATH /opt/node_modules/.bin:$PATH
WORKDIR /opt/app
COPY . .
RUN yarn build

# Creating final production image
FROM node:18.20.2-alpine

RUN apk add --no-cache vips-dev
ENV NODE_ENV=production
WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=build /opt/app ./
ENV PATH /opt/node_modules/.bin:$PATH

RUN chown -R node:node /opt/app

EXPOSE 1337
CMD ["yarn", "start"]
