#!/usr/bin/env bash

cd ./packages

if [ $1 ]; then
  cd $1
  if test -f ./rollup.config.js; then
    node ./dist/$1.cjs.js ||
    node ./dist/$1.esm.js
  fi
  cd ..
else
  echo yarn execute package 
fi

cd ..