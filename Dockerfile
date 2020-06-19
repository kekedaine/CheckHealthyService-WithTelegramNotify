FROM node:12.16.1-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN rm -rf src
CMD ["npm", "run", "serve"]