#!/usr/bin/env bash

cd ./packages

for i in *; do
  cd "$i"
  if [ -d ./src ]; then
    yarn rollup ./src/index.js --file ./dist/$i.esm.js --format es
    yarn rollup ./src/index.js --file ./dist/$i.amd.js --format amd
    yarn rollup ./src/index.js --file ./dist/$i.umd.js --format umd --name "@choco/$i"
    yarn rollup ./src/index.js --file ./dist/$i.cjs.js --format cjs
  fi
  cd ..
done

cd ..