#!/usr/bin/env sh

cd ./packages

if [ $1 ]; then
  mkdir $1
  cd $1
  shift
  npm init --scope=@chocolab $@
  cd ..
fi

cd ..