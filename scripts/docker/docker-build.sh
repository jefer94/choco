#!/bin/sh

# debug script
if [ $1 ]; then
  TAG=$1
else
  source ./.env
  TAG=latest
fi

docker build . \
  --rm=false \
  -t choco/interpreter-hub \
  -f products/InterpreterHub \
  --build-arg SESSION_SECRET \
  --build-arg SESSION_EXPIRATION \
  --build-arg SALT_ROUNDS \
  --build-arg MONGO_URI \
  --build-arg BUCKET \
  --build-arg IAM_KEY \
  --build-arg IAM_SECRET

docker build . \
  --rm=false \
  -t choco/nginx \
  -f products/Nginx \
  --build-arg EMAIL \
  --build-arg DOMAINS \
  --build-arg SERVICES

docker tag choco/interpreter-hub choco/interpreter-hub:$TAG
docker tag choco/nginx choco/nginx:$TAG

if [ $1 ]; then
  docker tag choco/interpreter-hub choco/interpreter-hub:latest
  docker tag choco/nginx choco/nginx:latest
fi