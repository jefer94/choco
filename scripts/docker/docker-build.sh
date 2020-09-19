#!/bin/sh

# debug script
# if [ $1 ]; then
#   TAG=$1
# else
#   source ./.env
#   TAG=latest
# fi

cd ./services

build() {
  echo ======================= $1 =======================
  cp ../tsconfig.json ./$1/original-tsconfig.json
  docker build ./$1 \
    --rm=false \
    -t chocolab/$1
  rm ./$1/original-tsconfig.json
}


if [ $1 ]; then
  build "$1"
else
  build activity
  # build algorithm
  build authenticator
  build cache
  build graphql-gateway
  build projects
  build world-cities-seed
fi


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
