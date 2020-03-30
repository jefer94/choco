#!/usr/bin/env bash

if [ $1 ]; then
  if ! yarn jest ./packages/$1; then
    exit 1
  fi
else
  if ! yarn jest ./packages; then
    exit 1
  fi
fi
