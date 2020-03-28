#!/usr/bin/env bash
cd ./packages/components
yarn rollup ./src/index.js --file ./dist/components.esm.js --format es
yarn rollup ./src/index.js --file ./dist/components.amd.js --format amd
yarn rollup ./src/index.js --file ./dist/components.umd.js --format umd --name '@choco/components'
yarn rollup ./src/index.js --file ./dist/components.cjs.js --format cjs
cd ../..