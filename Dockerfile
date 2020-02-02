FROM node:8.16.1-alpine
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
EXPOSE 3141
CMD ["npm", "start"]