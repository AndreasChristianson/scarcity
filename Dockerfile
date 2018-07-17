FROM node:10-alpine
WORKDIR /root/

COPY package*.json ./
RUN npm install --only=production

COPY dist dist
COPY config config

ENV SCARCITY_PORT 80
ENV DEBUG ioredis:*
EXPOSE 80
CMD [ "npm", "start" ]
