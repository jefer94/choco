#!/usr/bin/env bash
# ./scripts/build:cache.sh
# ./scripts/build:keychain.sh
# ./scripts/build:components.sh

cd ./packages

for i in *; do
  cd "$i"
  yarn rollup ./src/index.js --file ./dist/$i.esm.js --format es
  yarn rollup ./src/index.js --file ./dist/$i.amd.js --format amd
  yarn rollup ./src/index.js --file ./dist/$i.umd.js --format umd --name "@choco/$i"
  yarn rollup ./src/index.js --file ./dist/$i.cjs.js --format cjs
  cd ..
done

cd ..