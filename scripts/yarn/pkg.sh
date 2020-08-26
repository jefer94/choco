#!/usr/bin/env sh

if [ $1 ]; then
  if [ -d ./packages/$1 ]; then
    cd ./packages/$1
    shift
    yarn $@
  else
    cd ./services/$1
    shift
    yarn $@
  fi
fi
