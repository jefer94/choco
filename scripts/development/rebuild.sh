#!/usr/bin/env sh

ready=()
todo=()

ready+=1

build() {
  cd $1
  echo $1
  if test -f ./rollup.config.js; then
    yarn rollup -c $2 || todo+=$1
  elif test -f ./next.config.js; then
    yarn build || todo+=$1
  elif test -f ./webpack.config.js; then
    APP_ENV=production yarn webpack-cli --mode="production" || todo+=$1
  fi
  cd ..
}

cd ./packages

if [ $1 ]; then
  build $1 $2
else
  for folder in *; do
    build $folder
  done
  # while [ ! ${todo[@]} == "" ]; do
  #   folders=$todo
  #   todo=()
  #   for folder in $folders; do
  #     build $folder
  #   done
  # done
fi

cd ..