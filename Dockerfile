### STAGE 1: Définir le répertoire de travail ###
FROM node:current-alpine3.18 as build
WORKDIR /home/app
COPY package.json ./
RUN npm install
COPY . /home/app
RUN npm run build

### STAGE 2: ###
FROM nginx:1.17.1-alpine
COPY --from=build /home/app/dist/FrontEnd /usr/share/nginx/html
EXPOSE 80
