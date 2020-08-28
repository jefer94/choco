<div align="center">
  <br>
  <br>

  <a href="https://github.com/jefer94/algorithm">
    <img width="400"
      src="https://img.shields.io/badge/choco-functional-green.svg?style=for-the-badge&colorA=21252b&colorB=568af2">
  </a>

  [![deps](https://img.shields.io/david/jefer94/choco?path=packages%2Ffunctional)](https://david-dm.org/jefer94/choco?path=packages/functional)
  [![dev-deps](https://img.shields.io/david/dev/jefer94/choco?path=packages%2Ffunctional)](https://david-dm.org/jefer94/choco?path=packages/functional)
  [![chat](https://badges.gitter.im/jefer94/choco.svg)](https://gitter.im/jefer94/choco)
  [![Maintainability](https://api.codeclimate.com/v1/badges/5a4fd7ce7e0345f692fb/maintainability)](https://codeclimate.com/github/jefer94/choco/maintainability)
  [![Codacy Badge](https://app.codacy.com/project/badge/Grade/ee185db880024f3b81a5699acde77b06)](https://www.codacy.com/manual/jefer94/choco?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jefer94/choco&amp;utm_campaign=Badge_Grade)
  [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=flat)](https://www.gnu.org/licenses/gpl-3.0)
  [![npm version](https://img.shields.io/npm/v/%40chocolab%2Ffunctional.svg?style=flat)](https://www.npmjs.com/package/@chocolab/functional)
  [![npm size](https://img.shields.io/bundlephobia/min/%40chocolab%2Ffunctional)](https://www.npmjs.com/package/@chocolab/functional)
  [![npm downloads](https://img.shields.io/npm/dt/@chocolab/functional)](https://www.npmjs.com/package/@chocolab/functional)
  [![npm vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@chocolab/functional)](https://www.npmjs.com/package/@chocolab/functional)

  <br>
  <h1>@chocolab/functional</h1>
  <p>Functional utilities.</p>
</div>

## Install

```bash
yarn add @chocolab/functional
```

## Usage

```javascript
import { capitalizeFirstLetter, compose, filterObject, memo, toSnakeCase, url } from '@chocolab/functional'

// Capitalize first letter
capitalizeFirstLetter('pain') // return 'Pain'

function add(n) {
  return n + n
}

function square(n) {
  return n * n
}

function cube(n) {
  return n * n * n
}

// Compose
compose(cube, square, add)(2) // return 128

const game = {
  top: 'Jax',
  jg: 'Camille',
  mid: 'Kassadin',
  adc: 'Jhin',
  support: 'Bard'
}

// Filter object
filterObject(game, ['adc', 'support'])
/*
 * return {
 *   adc: 'Jhin',
 *   support: 'Bard',
 * }
 */

// Memo
memo('pokemon potato', game)
memo('pokemon potato') // return game

// Camel case to snake case
toSnakeCase('pokemonPotato') // return 'pokemon_potato'

// URL
url('google.co.ve', '/path', '/subpath') // return 'google.co.ve/path/subpath'

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
