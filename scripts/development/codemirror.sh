#!/usr/bin/env sh

# clone
mkdir libs
cd libs
rm -R codemirror
git clone https://github.com/codemirror/codemirror.next codemirror
cd codemirror

# last lag
latesttag=$(git describe --tags)
echo checking out ${latesttag}
git checkout ${latesttag}

# setup to module commonjs
# sed -i 's/ "es6"/ "es5"/g' tsconfig.base.json
sed -i 's/"es6"/"es5"/g' tsconfig.base.json
# sed -i 's/ "@codemirror/next"/ "@chocolab/codemirror"/g' package.json
sed -i '/"."/d' package.json
sed -i '/"type": "module"/d' package.json

sed -i '5i    "module": "commonjs",' tsconfig.base.json

yarn
yarn prepare

# add dist folder
sed -i '5i    "outDir": "./dist",' tsconfig.json

# install typescript
yarn global add typescript

# setup internal module to commonjs and build
for folder in *; do
  if [ -d $folder ] && [ -d $folder/src ] && [ -f $folder/package.json ]; then
    cd $folder
    echo build $folder
    sed -i 's/ "module"/ "commonjs"/g' package.json
    cp ../tsconfig.json ./tsconfig.json
    sed -i 's/"\*\//"/g' tsconfig.json
    sed -i 's/, "test\/\*\.ts"//g' tsconfig.json
    sed -i 's/, "demo\/demo\.ts"//g' tsconfig.json
    cp ../tsconfig.base.json ./tsconfig.base.json
    tsc --build ./tsconfig.json
    cd ..
  fi
done

cd ../..
yarn