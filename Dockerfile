# 
# Run following command from the current directory
# docker build -t kromi_tech-app .
FROM node:10.15.1
#From jprjr/ubuntu-nodejs:latest

# We want to use nodejs user and not default root
# RUN groupadd -r nodejs \
# && useradd -m -r -g nodejs nodejs
# USER nodejs

# Create app directory
RUN mkdir -p /var/app/kromi_tech

WORKDIR /var/app/kromi_tech

# Install app dependencies
COPY .npmrc .
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

RUN npm install webpack -g
RUN npm install


# Bundle app source
COPY . /var/app/kromi_tech


#COPY src/config.production.js /var/app/config.production.js


#ENV NODE_ENV production
ENV NODE_ENV production

# run build command
RUN npm run build:production


# Docker image has 9000 port opened -- this is where node server runs internally
EXPOSE 9000

CMD [ "npm", "start" ]
