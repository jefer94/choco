#!/usr/bin/env sh

yarn ncu -u
cd ./packages

update() {
  cd $1
  yarn ncu -u
  cd ..
}

if [ $1 ]; then
  if [ -d ./packages/$1 ]; then
    cd ./packages
  else
    cd ./services
  fi
  update $1
else
  cd ./packages
  for folder in *; do
    update $folder
  done
  cd ..

  cd ./services
  for folder in *; do
    update $folder
  done
  cd ..
fi

yarn
