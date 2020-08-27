<div align="center">
  <br>
  <br>

<a href="https://github.com/jefer94/algorithm">
    <img width="400"
      src="https://img.shields.io/badge/css-utils-green.svg?style=for-the-badge&colorA=21252b&colorB=568af2">
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
  <h1>@chocolab/css-utils</h1>
  <p>
    Handle CSS variables.
  </p>
</div>

<h2 align="center">Install</h2>

```bash
yarn add @chocolab/css-utils
```

<h2 align="center">Usage</h2>

```javascript
import { getVar, setVar } from '@chocolab/css-utils'

// CSS variable format
setVar('--potato', '#000')
getVar('--potato') // #000

// Javascript variable format
setVar('potato', '#000', true)
getVar('potato', true) // #000
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
