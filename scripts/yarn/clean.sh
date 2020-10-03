#!/usr/bin/env sh

cd ./packages
for folder in *; do
  cd $folder
  rm dist -R
  cd ..
done