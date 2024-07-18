FROM node:18-alpine


WORKDIR /src/server
RUN apk --no-cache add curl

COPY . .
RUN npm install



CMD [ "npm", "run", "start" ]