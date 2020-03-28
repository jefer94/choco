#!/usr/bin/env bash
cd ./packages/cache
yarn rollup ./src/index.js --file ./dist/cache.esm.js --format es
yarn rollup ./src/index.js --file ./dist/cache.amd.js --format amd
yarn rollup ./src/index.js --file ./dist/cache.umd.js --format umd --name '@choco/cache'
yarn rollup ./src/index.js --file ./dist/cache.cjs.js --format cjs
cd ../..