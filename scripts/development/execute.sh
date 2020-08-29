#!/usr/bin/env sh

cd ./services

if [ $1 ]; then
  cd "$1"
  if test -f ./rollup.config.js; then
    node "./dist/$1.cjs.js" ||
    node "./dist/$1.esm.js"
  elif test -f ./dist/index.js; then
    node ./dist/index.js
  elif test -f ./next.config.js; then
    yarn dev -p 2000
  elif test -f ./webpack.config.js; then
    yarn webpack-cli --watch
  fi
  cd ..
else
  echo yarn execute package 
fi

cd ..