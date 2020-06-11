#!/usr/bin/env bash

env() {
  var=$(grep $1 .env)
  IFS="="
  read -ra var <<< "$var"
  echo ${var[1]}
}

TAG=$(env TAG)

docker pull choco/interpreter-hub:$TAG
docker pull choco/nginx:$TAG

docker-compose up -d \
  --scale nginx=1 \
  --scale hub-web=5 \
  --scale hub-api=5 \
  --scale mongo=1

# clean unused images
docker system prune -f
