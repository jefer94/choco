#!/usr/bin/env bash
cd ./packages/keychain
yarn rollup ./src/index.js --file ./dist/keychain.esm.js --format es
yarn rollup ./src/index.js --file ./dist/keychain.amd.js --format amd
yarn rollup ./src/index.js --file ./dist/keychain.umd.js --format umd --name '@choco/keychain'
yarn rollup ./src/index.js --file ./dist/keychain.cjs.js --format cjs
cd ../..