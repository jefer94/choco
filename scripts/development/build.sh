#!/usr/bin/env sh

order0=( "env" "configs" )
order1=( "components" "functional" "hooks" "keychain" "middlewares" )
order2=( "cache" "algorithm-persistent" "algorithm" )

# seed() {
#   cd $1

#   mkdir ./dist > /dev/null 2>&1

#   # if [ ! -f ]
#   if [ ! -f ./dist/$1.cjs.js ]; then
#     echo "module.exports = {}" >> ./dist/$1.cjs.js
#   fi

#   if [ ! -f ./dist/$1.esm.js ]; then
#     echo "module.exports = {}" >> ./dist/$1.esm.js
#   fi

#   cd ..
# }

# index() {
#   rm index.cjs.js
#   rm index.esm.js

#   echo "const pkg = require('./dist/$1.cjs.js')" >> index.cjs.js
#   echo "" >> index.cjs.js
#   echo "module.exports = pkg" >> index.cjs.js

#   echo "const pkg = require('./dist/$1.esm.js')" >> index.esm.js
#   echo "" >> index.esm.js
#   echo "module.exports = pkg" >> index.esm.js
# }

# dependencies() {
#   if [ -f ./deps ]; then
#     IFS='
# '
#     for line in $(<./deps); do 
#       if test -f ../$line/rollup.config.js; then
#         node ../$line/index.cjs.js &
#       # elif test -f ../$line/next.config.js; then
#       #   dependencies
#       #   yarn build
#       #   killall node
#       elif test -f ../$line/webpack.config.js; then
#         APP_ENV=production node ../$line/dist/main.js &
#       fi
#       sleep 1s
#     done
#   fi
# }

build() {
  cd $1
  echo "<-------- $1 -------->"
  if test -f ./src/index.ts; then
    # resolve bug, because one element in rollup load index.cjs.js and it execution fail
    # mkdir dist > /dev/null 2>&1
    # touch ./dist/$1.cjs.js > /dev/null 2>&1
    # index $1
    # seed $1
    # dependencies
    # yarn rollup -c $2
    # yarn tsc ./src/index.ts $2 --outDir ./dist -t es5 -d --esModuleInterop --jsx react
    # yarn tsc $2
    yarn tsc --build ./tsconfig.json $2
    # killall node
  elif test -f ./rollup.config.js; then
    # resolve bug, because one element in rollup load index.cjs.js and it execution fail
    # mkdir dist > /dev/null 2>&1
    # touch ./dist/$1.cjs.js > /dev/null 2>&1
    # index $1
    # seed $1
    # dependencies
    yarn rollup -c $2
    # killall node
  elif test -f ./next.config.js; then
    # dependencies
    yarn build
    # killall node
  elif test -f ./webpack.config.js; then
    # dependencies
    APP_ENV=production yarn webpack-cli --mode="production"
    # killall node
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

# cd ..