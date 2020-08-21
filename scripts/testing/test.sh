#!/usr/bin/env sh

jest() {
  if ! yarn jest --forceExit --passWithNoTests --detectOpenHandles --notify --preset ts-jest --testEnvironment $1 ./ $2; then
  # if ! yarn jest --forceExit --passWithNoTests --detectOpenHandles --notify --preset ts-jest @shelf/jest-mongodb --testEnvironment $1 ./ $2; then
    exit 1
  fi
}

jestEnv() {
  cd $1
  if [ -f .node ]; then
    jest node $2
  elif [ -f .browser ]; then
    jest jsdom $2
  fi
  cd ..
}

if [ $1 ]; then
  if [ -d ./packages/$1 ]; then
    cd ./packages
    jestEnv $1 $2
  else
    cd ./services
    jestEnv $1 $2
  fi
else
  cd ./packages
  for folder in *; do
    jestEnv $folder
  done
  cd ..

  cd ./services
  for folder in *; do
    jestEnv $folder
  done
  cd ..
fi
