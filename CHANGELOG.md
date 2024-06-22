# Changelog

## [2.0.0](https://github.com/node-modules/ylru/compare/v1.4.0...v2.0.0) (2024-06-22)


### ⚠ BREAKING CHANGES

* drop Node.js < 18.19.0 support

https://github.com/eggjs/egg/issues/5257

<!-- This is an auto-generated comment: release notes by coderabbit.ai
-->

## Summary by CodeRabbit

- **New Features**
- Introduced a Least Recently Used (LRU) cache implementation with
enhanced functionalities.

- **Bug Fixes**
  - Improved cache item expiration handling and test case accuracy.

- **Documentation**
  - Updated `README` with new import syntax and method signatures.
  - LICENSE changed to MIT License.

- **Chores**
- Updated ESLint configuration, Node.js version in workflows, and
`.gitignore`.

- **Refactor**
- Converted test cases to use async/await and updated module imports to
ES module syntax.

- **Dependencies**
  - Updated `devDependencies` and added new scripts in `package.json`.

- **Build Configuration**
  - Updated `tsconfig.json` for stricter typing and ES2022 target.

<!-- end of auto-generated comment: release notes by coderabbit.ai -->

### Features

* support cjs and esm both ([#13](https://github.com/node-modules/ylru/issues/13)) ([73e07bf](https://github.com/node-modules/ylru/commit/73e07bf9231131a3ad3d4c3a5bf1314e75f8797f))

## [1.4.0](https://github.com/node-modules/ylru/compare/v1.3.2...v1.4.0) (2024-03-28)


### Features

* add reset method ([#10](https://github.com/node-modules/ylru/issues/10)) ([39ebcec](https://github.com/node-modules/ylru/commit/39ebcecbac34f8efd04959bb42cc6b88a9d2bd8a))

---


1.3.2 / 2022-03-17
==================

**others**
  * [[`eda13ec`](http://github.com/node-modules/ylru/commit/eda13ec31cb40d28cb00dea0369fc5c657aecb9c)] - test: update toolchains, add tsd test cases (raohai.rh <<raohai.rh@antgroup.com>>)
  * [[`b683526`](http://github.com/node-modules/ylru/commit/b68352659a95158a54f72f3ac502cd9881759d00)] - 🤖 TEST: Create codeql-analysis.yml (#7) (fengmk2 <<fengmk2@gmail.com>>)
  * [[`db06032`](http://github.com/node-modules/ylru/commit/db060326f526aa4aef23a77f5185e36922f4a178)] - 🤖 TEST: Run on github action (#6) (fengmk2 <<fengmk2@gmail.com>>)

1.3.1 / 2022-03-16
==================

**fixes**
  * [[`18f576e`](http://github.com/node-modules/ylru/commit/18f576eb12ce456a7af419b68bd17d74bf567de6)] - fix: module declares (#5) (陆沉 <<surgesoft@gmail.com>>)

1.3.0 / 2022-03-16
==================

**features**
  * [[`6ed8fa0`](http://github.com/node-modules/ylru/commit/6ed8fa004e1a0d634ba8d277f70933a7a8945cf2)] - feat: add d.ts (#4) (vagusX <<vagusX@users.noreply.github.com>>)

1.2.1 / 2018-07-11
==================

**others**
  * [[`475abb0`](http://github.com/node-modules/ylru/commit/475abb0e9c787fd65d7c3dd3d2d74d67560b0bec)] - perf: only call Date.now() when necessary (#3) (Yiyu He <<dead_horse@qq.com>>)

1.2.0 / 2017-07-18
==================

  * feat: support lru.keys (#2)

1.1.0 / 2017-07-04
==================

  * feat: support get with maxAge (#1)

1.0.0 / 2016-12-29
==================

 * init version
