#!/usr/bin/env sh

order0=( "env" "configs" )
order1=( "components" "functional" "hooks" "keychain" "middlewares" )
order2=( "cache" "algorithm-persistent" "algorithm" )

build() {
  cd $1
  echo "<-------- $1 -------->"
  if test -f ./src/index.ts; then
    yarn tsc --build ./tsconfig.json $2
  elif test -f ./rollup.config.js; then
    yarn rollup -c $2
  elif test -f ./next.config.js; then
    yarn build
  elif test -f ./webpack.config.js; then
    APP_ENV=production yarn webpack-cli --mode="production"
  fi
  cd ..
}

if [ $1 ]; then
  if [ -d ./packages/$1 ]; then
    cd ./packages
    build $1 $2
  else
    cd ./services
    build $1 $2
  fi
else
  cd ./packages
  for folder in *; do
    build $folder
  done
  cd ..

  cd ./services
  for folder in *; do
    build $folder
  done
  cd ..
fi
