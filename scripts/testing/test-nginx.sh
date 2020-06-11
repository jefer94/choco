#!/usr/bin/env bash

correct_status="200"
IFS=' '
read -ra SITES <<< "$@"

for site in "${SITES[@]}"; do
  status="$(curl -s -o /dev/null -w "%{http_code}" $site)"

  if [ $status == $correct_status ]; then
    echo $site is up
  else
    echo $site is down
    exit 1
  fi
done
