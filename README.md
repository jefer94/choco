<div align="center">
  <br>
  <br>

  <a href="https://github.com/jefer94/choco">
    <img
      width="400"
      src="https://img.shields.io/badge/choco-algorithm-green.svg?style=for-the-badge&colorA=21252b&colorB=568af2"
    />
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
  <h1>@choco/algorithm</h1>
  <p>
    Algorithm runtime emulator, like a IDE.
  </p>
</div>

<h2 align="center">Install</h2>

```bash
# Install
yarn

# Compile deps
yarn build

# Compile Algorithm
cd packages/algorithm
yarn build

# Run
yarn start
```

<h2 align="center">Packages</h2>

### Clients

|                   Name                | Description                             |
| :-----------------------------------: | :-------------------------------------- |
| [@choco/algorithm][choco-algorithm]   | Algorithm runtime emulator, like a IDE. |
| [@choco/authorize][choco-authorize]   | Authorization service.                  |

[choco-algorithm]: https://github.com/jefer94/choco/tree/master/packages/algorithm
[choco-authorize]: https://github.com/jefer94/choco/tree/master/packages/authorize

### Components

|                   Name                | Description                  |
| :-----------------------------------: | :--------------------------- |
| [@choco/components][choco-components] | React components, common UI. |

[choco-components]: https://github.com/jefer94/choco/tree/master/packages/components

### Tools

|                   Name                          | Description                                                  |
| :---------------------------------------------: | :----------------------------------------------------------- |
| [@choco/algorithm-transpiler][choco-transpiler] | Algorithm to Javascript transpiler.                          |
| [@choco/css-utils][choco-css]                   | Handle CSS variables.                                        |
| [@choco/env][choco-env]                         | Load .env for monorepos.                                     |
| [@choco/express-common][choco-express]          | Common Middlewares used in Express.                          |
| [@choco/i18n][choco-i18n]                       | Load dynamically our string, in we language.                 |
| [@choco/keychain][choco-keychain]               | Unique key generator for React, prevent unnecessary renders. |

[choco-transpiler]: https://github.com/jefer94/choco/tree/master/packages/algorithm-transpiler
[choco-css]: https://github.com/jefer94/choco/tree/master/packages/css-utils
[choco-env]: https://github.com/jefer94/choco/tree/master/packages/env
[choco-express]: https://github.com/jefer94/choco/tree/master/packages/express-common
[choco-i18n]: https://github.com/jefer94/choco/tree/master/packages/i18n
[choco-keychain]: https://github.com/jefer94/choco/tree/master/packages/keychain

### Services

|                   Name                          | Description                            |
| :---------------------------------------------: | :------------------------------------- |
| [@choco/algorithm-persistent][choco-persistent] | Persist state of @choco/algorithm.     |
| [@choco/authorize][choco-authorize]             | Authorization service.                 |
| [@choco/cache][choco-cache]                     | Cache service, improve response times. |
| [@choco/express-common][choco-express]          | Common Middlewares used in Express.    |
| [@choco/token-killer][choco-killer]             | Clean old token in database.           |

[choco-persistent]: https://github.com/jefer94/choco/tree/master/packages/algorithm-persistent
[choco-authorize]: https://github.com/jefer94/choco/tree/master/packages/authorize
[choco-cache]: https://github.com/jefer94/choco/tree/master/packages/cache
[choco-killer]: https://github.com/jefer94/choco/tree/master/packages/token-killer

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

<style>
table {
    width:100%;
}
</style>