#!/usr/bin/env sh

docs() {
  cd $1
  if [ -f ./src/static/swagger.yml ]; then
    yarn redoc-cli bundle ./src/static/swagger.yml
  fi
  cd ..
}

cd ./packages

if [ $1 ]; then
  docs $1
else
  for dir in *; do
    docs $dir
  done
fi

cd ..
