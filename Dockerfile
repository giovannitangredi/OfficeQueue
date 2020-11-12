FROM ubuntu:18.04
RUN apt-get update
RUN apt install -y nodejs
RUN apt install -y npm 
RUN apt install -y yarn
RUN yarn install -y
RUN yarn run start
