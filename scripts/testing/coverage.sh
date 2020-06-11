#!/usr/bin/env sh

cd ./packages

# if grep -q "jesttt" ./package.json; then echo a; else echo b; fi
if [ $1 ]; then
  cd $1
  if ! yarn jest --detectOpenHandles ./ --coverage --forceExit $2; then
    exit 1
  fi
  cd ..
else
  for i in *; do
    cd $i
    if ! yarn jest --detectOpenHandles ./ --coverage --forceExit; then
      exit 1
    fi
    cd ..
  done
fi

cd ..
