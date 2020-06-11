#!/bin/env sh

prefix=interpreter-hub

if [ "$1" == "api" ]; then
  cd ./packages/$prefix-$1
  node ./dist/main.js
elif [ "$1" == "web" ]; then
  cd ./packages/$prefix-$1
  yarn next start -p 2000
# elif [ "$1" == "cache" ]; then
#   cd ./packages/$1
#   node ./dist/$1.cjs.js
else
  echo docker run choco/project package
  echo where package should be api or web
  # if [ $1 ]; then
  #   echo $1 is not package
  # fi
fi