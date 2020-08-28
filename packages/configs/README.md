<div align="center">
  <br>
  <br>

  <a href="https://github.com/jefer94/algorithm">
    <img width="400"
      src="https://img.shields.io/badge/choco-configs-green.svg?style=for-the-badge&colorA=21252b&colorB=568af2">
  </a>

  [![deps](https://img.shields.io/david/jefer94/choco?path=packages%2Fconfigs)](https://david-dm.org/jefer94/choco?path=packages/configs)
  [![dev-deps](https://img.shields.io/david/dev/jefer94/choco?path=packages%2Fconfigs)](https://david-dm.org/jefer94/choco?path=packages/configs)
  [![chat](https://badges.gitter.im/jefer94/choco.svg)](https://gitter.im/jefer94/choco)
  [![Maintainability](https://api.codeclimate.com/v1/badges/5a4fd7ce7e0345f692fb/maintainability)](https://codeclimate.com/github/jefer94/choco/maintainability)
  [![Codacy Badge](https://app.codacy.com/project/badge/Grade/ee185db880024f3b81a5699acde77b06)](https://www.codacy.com/manual/jefer94/choco?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jefer94/choco&amp;utm_campaign=Badge_Grade)
  [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=flat)](https://www.gnu.org/licenses/gpl-3.0)
  [![npm version](https://img.shields.io/npm/v/%40chocolab%2Fconfigs.svg?style=flat)](https://www.npmjs.com/package/@chocolab/configs)
  [![npm size](https://img.shields.io/bundlephobia/min/%40chocolab%2Fconfigs)](https://www.npmjs.com/package/@chocolab/configs)
  [![npm downloads](https://img.shields.io/npm/dt/@chocolab/configs)](https://www.npmjs.com/package/@chocolab/configs)
  [![npm vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@chocolab/configs)](https://www.npmjs.com/package/@chocolab/configs)

  <br>
  <h1>@chocolab/configs</h1>
  <p>Configuration files.</p>
</div>

## Install

```bash
yarn add @chocolab/configs
```

## Usage

```javascript
// babel.config.js
const configs = require('@chocolab/configs')
module.exports = configs.babel()

// .eslintrc.js
const configs = require('@chocolab/configs')
module.exports = configs.eslint()

// next.config.js
const configs = require('@chocolab/configs')
module.exports = configs.next()

// rollup.config.js
const configs = require('@chocolab/configs')
module.exports = configs.rollup('module')

// .storybook/main.js
const configs = require('@chocolab/configs')
module.exports = configs.storybook()

// .stylelintrc.js
const configs = require('@chocolab/configs')
module.exports = configs.stylelint()

// webpack.config.js
const configs = require('@chocolab/configs')
module.exports = configs.webpack('./dir')
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
