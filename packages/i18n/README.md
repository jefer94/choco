<div align="center">
  <br>
  <br>

<a href="https://github.com/jefer94/algorithm">
    <img width="400"
      src="https://img.shields.io/badge/choco-i18n-green.svg?style=for-the-badge&colorA=21252b&colorB=568af2">
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
  <h1>@chocolab/i18n</h1>
  <p>
    Load dynamically our string, in we language.
  </p>
</div>

<h2 align="center">Install</h2>

```bash
yarn add @chocolab/i18n
```

<h2 align="center">Usage</h2>

```javascript
import locale from '@chocolab/keychain'

// loading locales
locale.set('en', 'cow', 'cow')
locale.set('es', 'cow', 'vaca')

// getting locales, with browser in english
locale.all() // returns { cow: 'cow' }
locale.one('cow') // returns 'cow'
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
