#!/usr/bin/env bash
./scripts/build:cache.sh
cd ./packages/cache
node ./dist/cache.esm.js
cd ../..