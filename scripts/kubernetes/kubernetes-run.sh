#!/bin/sh

# if [ $1 ]; then
#   TAG=$1
# else
#   source ./.env
#   TAG=latest
# fi

docker push chocolab/activity:latest
# docker push chocolab/algorithm:latest
docker push chocolab/authenticator:latest
docker push chocolab/cache:latest
docker push chocolab/graphql-gateway:latest
docker push chocolab/projects:latest
docker push chocolab/world-cities-seed:latest


# docker push choco/interpreter-hub:$TAG
# docker push choco/nginx:$TAG

# if [ $1 ]; then
#   docker push choco/interpreter-hub:latest
#   docker push choco/nginx:latest
# fi