#!/usr/bin/env sh

cd ./packages

if [ $1 ]; then
  cd $1
  shift
  yarn $@
  cd ..
fi

cd ..