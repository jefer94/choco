#!/usr/bin/env sh

cd packages

remove() {
  if [ ! $1 == "configs" ]; then
    cd $1
    rm -R dist
    cd ..
  fi
}

if [ $1 ]; then
  remove $1
else
  for folder in *; do
    remove $folder
  done
fi

cd ..
