FROM node:lts-alpine
RUN mkdir app
WORKDIR /app
COPY package*.json .
COPY tsconfig.json .
RUN npm install
COPY wildersdb.sqlite .
COPY src src
CMD npm start