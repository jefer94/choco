#!/usr/bin/env sh

cd ./packages

jest() {
  if ! yarn jest --forceExit --passWithNoTests --detectOpenHandles --notify --preset ts-jest --testEnvironment $1 ./ $2; then
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
  jestEnv $1 $2
else
  for folder in *; do
    jestEnv $folder
  done
fi

cd ..
