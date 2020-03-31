#!/usr/bin/env bash

if [ $1 ]; then
  yarn jest ./packages/$1 --coverage
else
  yarn jest ./packages --coverage && yarn coveralls < coverage/lcov.info
fi
