#!/usr/bin/env bash

yarn ncu -u
cd ./packages

if [ $1 ]; then
  cd $1
  yarn ncu -u
  cd ..
else
  for i in *; do
    cd "$i"
    yarn ncu -u
    cd ..
  done
fi

yarn
cd ..
