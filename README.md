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
  <h1>@chocolab/algorithm</h1>
  <p>
    Algorithm runtime emulator, like a IDE.
  </p>
</div>

<h2 align="center">Install</h2>

```bash
# Clone
git clone https://github.com/jefer94/choco.git
cd choco

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

<h2 align="center">Services</h2>

| Name | Description |
| :--- | :--- |
| [algorithm][choco-algorithm] | Algorithm frontend. |
| [graphql-gateway][choco-graphql-gateway] | GraphQL API Gateway. |
| [activity][choco-activity] | Log of user activities. |
| [authenticator][choco-authenticator] | Manage auth and tokens. |
| [authorize][choco-authorize] | Legacy authorization manager. |
| [cache][choco-cache] | Manage in memory cache. |
| [projects][choco-projects] | User projects. |
| [world-cities-seed][choco-world-cities-seed] | Countries, cities and language database seed. |

[choco-algorithm]: https://github.com/jefer94/choco/tree/master/services/algorithm
[choco-graphql-gateway]: https://github.com/jefer94/choco/tree/master/services/graphql-gateway
[choco-activity]: https://github.com/jefer94/choco/tree/master/services/activity
[choco-authenticator]: https://github.com/jefer94/choco/tree/master/services/authenticator
[choco-authorize]: https://github.com/jefer94/choco/tree/master/services/authorize
[choco-cache]: https://github.com/jefer94/choco/tree/master/services/cache
[choco-projects]: https://github.com/jefer94/choco/tree/master/services/projects
[choco-world-cities-seed]: https://github.com/jefer94/choco/tree/master/services/world-cities-seed


<h2 align="center">Packages</h2>

| Name | Description |
| :--- | :--- |
| [@chocolab/components][choco-components] | React components, common UI. |
| [@chocolab/algorithm-transpiler][choco-transpiler] | Algorithm to Javascript transpiler. |
| [@chocolab/configs][configs] | Configuration files |
| [@chocolab/css-utils][choco-css] | Handle CSS variables. |
| [@chocolab/env][choco-env] | Load .env for monorepos. |
| [@chocolab/functional][choco-functional] | Functional utilities. |
| [@chocolab/hooks][choco-hooks] | React hooks. |
| [@chocolab/i18n][choco-i18n] | Load dynamically our string, in we language. |
| [@chocolab/keychain][choco-keychain] | Unique key generator for React, prevent unnecessary renders. |
| [@chocolab/middlewares][choco-middlewares] | Common Middlewares used in Express. |
| [@chocolab/password][choco-password] | Encrypt and decrypt password. |

[choco-components]: https://github.com/jefer94/choco/tree/master/packages/components
[choco-transpiler]: https://github.com/jefer94/choco/tree/master/packages/algorithm-transpiler
[choco-css]: https://github.com/jefer94/choco/tree/master/packages/css-utils
[configs]: https://github.com/jefer94/choco/tree/master/packages/configs
[choco-env]: https://github.com/jefer94/choco/tree/master/packages/env
[choco-functional]: https://github.com/jefer94/choco/tree/master/packages/functional
[choco-hooks]: https://github.com/jefer94/choco/tree/master/packages/hooks
[choco-middlewares]: https://github.com/jefer94/choco/tree/master/packages/middlewares
[choco-i18n]: https://github.com/jefer94/choco/tree/master/packages/i18n
[choco-keychain]: https://github.com/jefer94/choco/tree/master/packages/keychain
[choco-password]: https://github.com/jefer94/choco/tree/master/packages/password

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
