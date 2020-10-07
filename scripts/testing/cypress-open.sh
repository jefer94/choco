#!/usr/bin/env sh

cypress() {
  cd $1
  yarn cypress open
}

cd ./services

if [ $1 ]; then
  cypress $1 $2
fi

cd ..
