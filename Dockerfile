FROM node:14.16.0


COPY . /server

WORKDIR /server

ENV environment=docker

RUN ls -al
