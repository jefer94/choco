#!/usr/bin/env bash
cd ./packages/cache
yarn rollup ./src/index.js --file ./dist/cache.js --format es
yarn rollup ./src/index.js --file ./dist/cache.amd.js --format amd
yarn rollup ./src/index.js --file ./dist/cache.cjs.js --format cjs
cd ../..