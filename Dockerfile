FROM ubuntu:18.04
RUN apt-get update
RUN apt install -y nodejs
RUN apt install npm
RUN apt install -y yarn
RUN yarn 
RUN yarn run start
