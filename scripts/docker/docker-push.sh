#!/bin/sh

if [ $1 ]; then
  TAG=$1
else
  source ./.env
  TAG=latest
fi

docker push choco/interpreter-hub:$TAG
docker push choco/nginx:$TAG

if [ $1 ]; then
  docker push choco/interpreter-hub:latest
  docker push choco/nginx:latest
fi