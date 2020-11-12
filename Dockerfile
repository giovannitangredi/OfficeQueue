FROM ubuntu:18.04
RUN apt-get update
RUN apt install -y nodejs
RUN apt install -y npm 
RUN apt install -y yarn
COPY package*.json ./
CMD ['yarn','install']
# Bundle app source
COPY . .
CMD ['yarn','start']
