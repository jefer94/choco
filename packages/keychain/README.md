<div align="center">
  <br>
  <br>

  <a href="https://github.com/jefer94/algorithm">
    <img width="400"
      src="https://img.shields.io/badge/choco-keychain-green.svg?style=for-the-badge&colorA=21252b&colorB=568af2">
  </a>

  [![deps](https://img.shields.io/david/jefer94/choco?path=packages%2Fkeychain)](https://david-dm.org/jefer94/choco?path=packages/keychain)
  [![dev-deps](https://img.shields.io/david/dev/jefer94/choco?path=packages%2Fkeychain)](https://david-dm.org/jefer94/choco?path=packages/keychain)
  [![chat](https://badges.gitter.im/jefer94/choco.svg)](https://gitter.im/jefer94/choco)
  [![Maintainability](https://api.codeclimate.com/v1/badges/5a4fd7ce7e0345f692fb/maintainability)](https://codeclimate.com/github/jefer94/choco/maintainability)
  [![Codacy Badge](https://app.codacy.com/project/badge/Grade/ee185db880024f3b81a5699acde77b06)](https://www.codacy.com/manual/jefer94/choco?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jefer94/choco&amp;utm_campaign=Badge_Grade)
  [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=flat)](https://www.gnu.org/licenses/gpl-3.0)
  [![npm version](https://img.shields.io/npm/v/%40chocolab%2Fkeychain.svg?style=flat)](https://www.npmjs.com/package/@chocolab/keychain)
  [![npm size](https://img.shields.io/bundlephobia/min/%40chocolab%2Fkeychain)](https://www.npmjs.com/package/@chocolab/keychain)
  [![npm downloads](https://img.shields.io/npm/dt/@chocolab/keychain)](https://www.npmjs.com/package/@chocolab/keychain)
  [![npm vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@chocolab/keychain)](https://www.npmjs.com/package/@chocolab/keychain)

  <br>
  <h1>@chocolab/keychain</h1>
  <p>Unique key generator for React, prevent unnecessary renders.</p>
</div>

## Install

```bash
yarn add @chocolab/keychain
```

## Usage

```javascript
import keychain from '@chocolab/keychain'

keychain('products') // return 'products_0'
keychain('products') // return 'products_1'
keychain('products') // return 'products_2'

keychain('cows') // return 'cows_0'
keychain('cows') // return 'cows_1'
```

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/jefer94.png?s=150">
        <br>
        <a href="https://github.com/jefer94">jefer94</a>
      </td>
     </tr>
  </tbody>
</table>
