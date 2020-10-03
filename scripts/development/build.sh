#!/usr/bin/env sh

yarn clean
yarn build:deps --scope=@chocolab/functional
yarn build:deps --scope=@chocolab/i18n
yarn build:deps --scope=@chocolab/keychain
yarn build:deps --scope=@chocolab/algorithm-transpiler
yarn build:deps