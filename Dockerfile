FROM node:10-alpine
WORKDIR /root/
COPY package*.json ./
RUN npm install --only=production

COPY dist ./
COPY config ./

ENV SCARCITY_PORT 80
EXPOSE 80
CMD [ "npm", "start" ]
