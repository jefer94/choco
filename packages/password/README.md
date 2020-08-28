<div align="center">
  <br>
  <br>

  <a href="https://github.com/jefer94/algorithm">
    <img width="400"
      src="https://img.shields.io/badge/choco-password-green.svg?style=for-the-badge&colorA=21252b&colorB=568af2">
  </a>

  [![deps](https://img.shields.io/david/jefer94/choco?path=packages%2Fpassword)](https://david-dm.org/jefer94/choco?path=packages/password)
  [![dev-deps](https://img.shields.io/david/dev/jefer94/choco?path=packages%2Fpassword)](https://david-dm.org/jefer94/choco?path=packages/password)
  [![chat](https://badges.gitter.im/jefer94/choco.svg)](https://gitter.im/jefer94/choco)
  [![Maintainability](https://api.codeclimate.com/v1/badges/5a4fd7ce7e0345f692fb/maintainability)](https://codeclimate.com/github/jefer94/choco/maintainability)
  [![Codacy Badge](https://app.codacy.com/project/badge/Grade/ee185db880024f3b81a5699acde77b06)](https://www.codacy.com/manual/jefer94/choco?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jefer94/choco&amp;utm_campaign=Badge_Grade)
  [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=flat)](https://www.gnu.org/licenses/gpl-3.0)
  [![npm version](https://img.shields.io/npm/v/%40chocolab%2Fpassword.svg?style=flat)](https://www.npmjs.com/package/@chocolab/password)
  [![npm size](https://img.shields.io/bundlephobia/min/%40chocolab%2Fpassword)](https://www.npmjs.com/package/@chocolab/password)
  [![npm downloads](https://img.shields.io/npm/dt/@chocolab/password)](https://www.npmjs.com/package/@chocolab/password)
  [![npm vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@chocolab/password)](https://www.npmjs.com/package/@chocolab/password)

  <br>
  <h1>@chocolab/password</h1>
  <p>Encrypt and decrypt password</p>
</div>

## Install

```bash
yarn add @chocolab/password
```

## Usage

```javascript
import { encrypt, decrypt } from '@chocolab/password'

const hash = await encrypt('password')
await decrypt('password', hash) // return true
await decrypt('passwd', hash) // return false
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
