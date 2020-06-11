#!/usr/bin/env sh

api() {
  cd $1
  if [ -f ./swagger.yml ]; then
    yarn redoc-cli bundle ./swagger.yml --output ./docs/api/index.html $2
    cp ./docs/api/index.html ./src/static/index.html
  fi
  cd ..
}

cd ./packages

if [ $1 ]; then
  api $1 $2
else
  for dir in *; do
    api $dir
  done
fi

cd ..
