#!/bin/sh

# debug script
# if [ $1 ]; then
#   TAG=$1
# else
#   source ./.env
#   TAG=latest
# fi

cd ./services

docker build world-cities-seed/ \
  --rm=false \
  -t choco/world-cities-seed

# docker build . \
#   --rm=false \
#   -t choco/nginx \
#   -f products/Nginx \
#   --build-arg EMAIL \
#   --build-arg DOMAINS \
#   --build-arg SERVICES

# docker tag choco/interpreter-hub choco/interpreter-hub:$TAG
# docker tag choco/nginx choco/nginx:$TAG

# if [ $1 ]; then
#   docker tag choco/interpreter-hub choco/interpreter-hub:latest
#   docker tag choco/nginx choco/nginx:latest
# fi

# docker tag choco/interpreter-hub choco/interpreter-hub:latest
# docker tag choco/nginx choco/nginx:latest