#!/usr/bin/env bash

cd ./packages

if [ $1 ]; then
  cd $1
  if ! yarn jest ./ $2; then
    exit 1
  fi
  cd ..
else

  for i in *; do
    cd $i
    if ! yarn jest ./; then
      exit 1
    fi
    cd ..
  done
fi

cd ..
