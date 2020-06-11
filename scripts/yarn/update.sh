#!/usr/bin/env sh

yarn ncu -u
cd ./packages

update() {
  cd $1
  yarn ncu -u
  cd ..
}

if [ $1 ]; then
  update $1
else
  for folder in *; do
    update $folder
  done
fi

yarn
cd ..
