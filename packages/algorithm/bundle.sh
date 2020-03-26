#!/usr/bin/env bash
yarn rollup ./src/index.js --file ./dist/algorithm.js --format es
yarn rollup ./src/index.js --file ./dist/algorithm.amd.js --format amd
yarn rollup ./src/index.js --file ./dist/algorithm.cjs.js --format cjs