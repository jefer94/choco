#!/bin/sh

cd ./services

build() {
  echo ======================= $1 =======================
  docker build ./$1 \
    --rm=false \
    -t chocolab/$1
}

if [ $1 ]; then
  build "$1"
else
  build activity
  build algorithm
  build authenticator
  build cache
  build graphql-gateway
  build projects
  build world-cities-seed
fi
