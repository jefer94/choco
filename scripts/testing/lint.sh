#!/usr/bin/env sh

cd ./packages

if [ $1 ]; then
  cd $1
  if ! yarn eslint **/*.{t,j}s $2; then
    exit 1
  fi
  cd ..
else
  for i in *; do
    cd $i
    if ! yarn eslint **/*.{t,j}s; then
      exit 1
    fi
    cd ..
  done
fi

cd ..
