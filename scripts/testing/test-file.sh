#!/usr/bin/env sh

cd ./packages

# if grep -q "jesttt" ./package.json; then echo a; else echo b; fi
if [ $1 ]; then
  cd $1
  echo $2
  # yarn jest --detectOpenHandles $2 --forceExit --watch --verbose true
  name=$(find . -type f -name "$2" ! -path "./node_modules")
  yarn jest --detectOpenHandles $name --forceExit --watch
  cd ..
# else
fi

cd ..
