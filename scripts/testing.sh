#!/usr/bin/env bash

if [ -z $1 ]; then
  yarn jest ./packages/$1 --watchAll
else
  yarn jest ./packages --watchAll
fi
