#!/usr/bin/env sh

grey=$(tput setaf 0)
red=$(tput setaf 1)
green=$(tput setaf 2)
yelloc=$(tput setaf 3)
blue=$(tput setaf 4)
violet=$(tput setaf 5)
cyan=$(tput setaf 6)
white=$(tput setaf 7)
normal=$(tput sgr0)

lint() {
  cd $1
  echo "<-------- $1 -------->"
  if ! yarn eslint src/**/* $2; then

    printf "\n"
    printf '%0s\n' "${red}'$1' package/service has failed${normal}"
    printf "\n"
    exit 1
  fi
  cd ..
}

if [ $1 ]; then
  if [ -d ./packages/$1 ]; then
    cd ./packages
    lint $1 $2
  else
    cd ./services
    lint $1 $2
  fi
else
  cd ./packages
  for folder in *; do
    lint $folder
  done
  cd ..

  cd ./services
  for folder in *; do
    lint $folder
  done
  cd ..
fi
