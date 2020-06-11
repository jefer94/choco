#!/usr/bin/env sh

lint() {
  cd $1
  if ! yarn stylelint "**/*.js" $2; then
    exit 1
  fi
  cd ..
}

cd ./packages

if [ $1 ]; then
  lint $1 $2
else
  for i in *; do
    lint $i
  done
fi

cd ..
