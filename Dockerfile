FROM node:10-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm test
RUN npm run build



FROM node:10-alpine
WORKDIR /root/
COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /usr/src/app/lib lib
COPY --from=builder /usr/src/app/config config

ENV SCARCITY_PORT 80
EXPOSE 80
CMD [ "npm", "start" ]
