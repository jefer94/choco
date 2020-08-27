<div align="center">
  <br>
  <br>

<a href="https://github.com/jefer94/algorithm">
    <img width="400"
      src="https://img.shields.io/badge/choco-keychain-green.svg?style=for-the-badge&colorA=21252b&colorB=568af2">
  </a>

[![deps][deps]][deps-url]
[![dev-deps][dev-deps]][dev-deps-url]
[![chat][chat]][chat-url]

[deps]: https://david-dm.org/jefer94/choco.svg
[deps-url]: https://david-dm.org/jefer94/choco

[dev-deps]: https://david-dm.org/jefer94/choco/dev-status.svg
[dev-deps-url]: https://david-dm.org/jefer94/choco

[chat]: https://badges.gitter.im/jefer94/choco.svg
[chat-url]: https://gitter.im/jefer94/choco

  <br>
  <h1>@chocolab/keychain</h1>
  <p>
    Unique key generator for React, prevent unnecessary renders.
  </p>
</div>

<h2 align="center">Install</h2>

```bash
yarn add @chocolab/keychain
```

<h2 align="center">Usage</h2>

```javascript
import keychain from '@chocolab/keychain'

keychain('products') // returns 'products_0'
keychain('products') // returns 'products_1'
keychain('products') // returns 'products_2'
// ...

keychain('cows') // returns 'cows_0'
keychain('cows') // returns 'cows_1'
// ...
```

<h2 align="center">Maintainers</h2>

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
