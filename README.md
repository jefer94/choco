<div align="center">
  <br>
  <br>

  <a href="https://github.com/jefer94/choco">
    <img
      width="400"
      src="https://img.shields.io/badge/choco-algorithm-green.svg?style=for-the-badge&colorA=21252b&colorB=568af2"
    />
  </a>

  [![deps](https://david-dm.org/jefer94/choco.svg)](https://david-dm.org/jefer94/choco)
  [![dev-deps](https://david-dm.org/jefer94/choco/dev-status.svg)](https://david-dm.org/jefer94/choco)
  [![chat](https://badges.gitter.im/jefer94/choco.svg)](https://gitter.im/jefer94/choco)
  [![Maintainability](https://api.codeclimate.com/v1/badges/5a4fd7ce7e0345f692fb/maintainability)](https://codeclimate.com/github/jefer94/choco/maintainability)
  [![Codacy Badge](https://app.codacy.com/project/badge/Grade/ee185db880024f3b81a5699acde77b06)](https://www.codacy.com/manual/jefer94/choco?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jefer94/choco&amp;utm_campaign=Badge_Grade)
  [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=flat)](https://www.gnu.org/licenses/gpl-3.0)
  [![github commits](https://img.shields.io/github/commit-activity/m/jefer94/choco)](https://github.com/jefer94/choco)
  [![github contributors](https://img.shields.io/github/contributors/jefer94/choco)](https://github.com/jefer94/choco)
  [![github last commit](https://img.shields.io/github/last-commit/jefer94/choco)](https://github.com/jefer94/choco)
  [![github vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/jefer94/choco)](https://github.com/jefer94/choco)
  <!-- [![security headers](https://img.shields.io/security-headers?url=https%3A%2F%2Fchoco-algorithm.herokuapp.com%2F)](https://choco-algorithm.herokuapp.com/) -->
  <!-- [![website up](https://img.shields.io/website?url=https%3A%2F%2Fchoco-algorithm.herokuapp.com%2F)](https://choco-algorithm.herokuapp.com/) -->
  <!-- [![w3c validation](https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fchoco-algorithm.herokuapp.com%2F)](https://choco-algorithm.herokuapp.com/) -->

  <br>
  <h1>Choco Algorithm</h1>
  <p>Services that provide a algorithm runtime emulator, and an IDE.</p>
</div>

## Install

```bash
# Clone
git clone https://github.com/jefer94/choco.git
cd choco

# Install
yarn

# Compile deps
yarn build:deps
yarn build:deps --scope=@chocolab/i18n
yarn build:deps --scope=@chocolab/algorithm-transpiler

# Execute service
yarn execute SERVICE_NAME

# Run in docker
docker-compose up -d
```

## Services

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

## Packages

| Name | Description |
| :--- | :--- |
| [@chocolab/components][choco-components] | React components, common UI. |
| [@chocolab/algorithm-transpiler][choco-transpiler] | Algorithm to Javascript transpiler. |
| [@chocolab/configs][configs] | Configuration files. |
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
