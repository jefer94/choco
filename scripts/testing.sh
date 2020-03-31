#!/usr/bin/env bash

cd ./packages

if [ $1 ]; then
  cd $1
  yarn jest ./ --watchAll
  cd ..
else
  echo yarn testing package
fi

cd ..
