#!/usr/bin/env sh
storybook() {
  cd $1
  if [ -f .storybook/main.js ]; then
    yarn start-storybook
    # yarn build-storybook -c .storybook -o .out
  fi
  cd ..
}

cd ./packages

if [ $1 ]; then
  storybook $1
else
  for dir in *; do
    storybook $dir
  done
fi

cd ..
