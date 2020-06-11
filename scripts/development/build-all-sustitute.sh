#!/usr/bin/env sh

order0=( "env" "configs" )
order1=( "components" "functional" "hooks" "keychain" "middlewares" )
order2=( "cache" "interpreter-hub-api" "interpreter-hub-app" )

seed() {
  cd $1

  mkdir ./dist > /dev/null 2>&1

  if [ ! -f ./dist/$1.cjs.js ]; then
    echo "module.exports = {}" >> ./dist/$1.cjs.js
  fi

  if [ ! -f ./dist/$1.esm.js ]; then
    echo "module.exports = {}" >> ./dist/$1.esm.js
  fi

  cd ..
}

cd ./packages
folders=*

for folder in $folders; do
  if [ ! $folder == "configs" ]; then
    seed $folder
  fi
done

cd ..

for folder in $folders; do
echo aa $folder aa
  ./scripts/development/build.sh $folder
done

# for folder in ${order0[@]}; do
#   ./scripts/development/build.sh $folder
# done

# for folder in ${order1[@]}; do
#   ./scripts/development/build.sh $folder
# done

# for folder in ${order2[@]}; do
#   ./scripts/development/build.sh $folder
# done
