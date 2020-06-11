#!/usr/bin/env sh

index() {
  cd $1
  if test -f ./rollup.config.js; then
    rm index.cjs.js
    rm index.esm.js

    echo "const pkg = require('./dist/$1.cjs.js')" >> index.cjs.js
    echo "" >> index.cjs.js
    echo "module.exports = pkg" >> index.cjs.js

    echo "const pkg = require('./dist/$1.esm.js')" >> index.esm.js
    echo "" >> index.esm.js
    echo "module.exports = pkg" >> index.esm.js
  fi
  cd ..
}

cd ./packages

if [ $1 ]; then
  index $1 $2
else
  for folder in *; do
    index $folder
  done
fi

cd ..