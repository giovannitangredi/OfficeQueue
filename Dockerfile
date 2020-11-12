FROM ubuntu:18.04
RUN apt-get update
RUN apt install -y nodejs
RUN apt install -y npm 
RUN apt install -y yarn
COPY package*.json ./
RUN yarn install 
# Bundle app source
COPY . .
RUN yarn run start
