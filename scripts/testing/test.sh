#!/usr/bin/env sh

cd ./packages

# if grep -q "jesttt" ./package.json; then echo a; else echo b; fi
if [ $1 ]; then
  cd $1
  # --detectOpenHandles
  # --listTests
  # --runInBand
  # --bail
  if ! yarn jest --forceExit --detectOpenHandles --notify ./ $2; then
    exit 1
  fi
  cd ..
else
  for i in *; do
    cd $i
    if ! yarn jest --forceExit --passWithNoTests --detectOpenHandles ./; then
      exit 1
    fi
    cd ..
  done
fi

cd ..
