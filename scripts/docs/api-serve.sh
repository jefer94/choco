#!/usr/bin/env sh

api() {
  cd $1
  if [ -f ./swagger.yml ]; then
    yarn redoc-cli serve ./swagger.yml $2
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
