#!/usr/bin/env bash

cd ./packages

if [ $1 ]; then
  cd $1
  if test -f ./rollup.config.js; then
    yarn rollup -c $2
  fi
  cd ..
else
  for i in *; do
    cd "$i"
    if test -f ./rollup.config.js; then
      yarn rollup -c
    fi
    cd ..
  done
fi

cd ..