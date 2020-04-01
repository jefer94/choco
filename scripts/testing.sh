#!/usr/bin/env bash

cd ./packages

if [ $1 ]; then
  cd $1
  yarn jest ./ --watch $2 # --watchAll $2
  cd ..
else
  echo yarn testing package
fi

cd ..
