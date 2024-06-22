# ylru

[![NPM version][npm-image]][npm-url]
[![Node.js CI](https://github.com/node-modules/ylru/actions/workflows/nodejs.yml/badge.svg)](https://github.com/node-modules/ylru/actions/workflows/nodejs.yml)
[![Test coverage][codecov-image]][codecov-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/ylru.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ylru
[codecov-image]: https://img.shields.io/codecov/c/github/node-modules/ylru.svg?style=flat-square
[codecov-url]: https://codecov.io/github/node-modules/ylru?branch=master
[snyk-image]: https://snyk.io/test/npm/ylru/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/ylru
[download-image]: https://img.shields.io/npm/dm/ylru.svg?style=flat-square
[download-url]: https://npmjs.org/package/ylru

**hashlru inspired**

[hashlru](https://github.com/dominictarr/hashlru) is the **Simpler, faster LRU cache algorithm.**
Please checkout [algorithm](https://github.com/dominictarr/hashlru#algorithm) and [complexity](https://github.com/dominictarr/hashlru#complexity) on hashlru.

ylru extends some features base on hashlru:

- cache value can be **expired**.
- cache value can be **empty value**, e.g.: `null`, `undefined`, `''`, `0`

## Usage

```ts
import { LRU } from 'ylru';

const lru = new LRU(100);
lru.set(key, value);
lru.get(key);

// value2 will be expired after 5000ms
lru.set(key2, value2, { maxAge: 5000 });
// get key and update expired
lru.get(key2, { maxAge: 5000 });
```

### API

## new LRU(max) => lru

initialize a lru object.

### lru.get(key[, options]) => value | null

- `{Number} options.maxAge`: update expire time when get, value will become `undefined` after `maxAge` pass.

Returns the value in the cache.

### lru.set(key, value[, options])

- `{Number} options.maxAge`: value will become `undefined` after `maxAge` pass.
If `maxAge` not set, value will be never expired.

Set the value for key.

### lru.keys()

Get all unexpired cache keys from lru, due to the strategy of ylru, the `keys`' length may greater than `max`.

```ts
const lru = new LRU(3);

lru.set('key 1', 'value 1');
lru.set('key 2', 'value 2');
lru.set('key 3', 'value 3');
lru.set('key 4', 'value 4');

lru.keys(); // [ 'key 4', 'key 1', 'key 2', 'key 3']
// cache: {
//   'key 4': 'value 4',
// }
// _cache: {
//   'key 1': 'value 1',
//   'key 2': 'value 2',
//   'key 3': 'value 3',
// }
```

### lru.reset()

reset a lru object.

```ts
const lru = new LRU(3);

lru.set('key 1', 'value 1');
lru.set('key 2', 'value 2');
lru.set('key 3', 'value 3');
lru.set('key 4', 'value 4');

lru.reset();
// cache: {
// }
// _cache: {
// }

lru.keys().length === 0;
```

## License

[MIT](LICENSE)

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars.githubusercontent.com/u/156269?v=4" width="100px;"/><br/><sub><b>fengmk2</b></sub>](https://github.com/fengmk2)<br/>|[<img src="https://avatars.githubusercontent.com/u/259374?v=4" width="100px;"/><br/><sub><b>dominictarr</b></sub>](https://github.com/dominictarr)<br/>|[<img src="https://avatars.githubusercontent.com/u/985607?v=4" width="100px;"/><br/><sub><b>dead-horse</b></sub>](https://github.com/dead-horse)<br/>|[<img src="https://avatars.githubusercontent.com/u/958063?v=4" width="100px;"/><br/><sub><b>thonatos</b></sub>](https://github.com/thonatos)<br/>|[<img src="https://avatars.githubusercontent.com/u/25395?v=4" width="100px;"/><br/><sub><b>mourner</b></sub>](https://github.com/mourner)<br/>|[<img src="https://avatars.githubusercontent.com/u/32174276?v=4" width="100px;"/><br/><sub><b>semantic-release-bot</b></sub>](https://github.com/semantic-release-bot)<br/>|
| :---: | :---: | :---: | :---: | :---: | :---: |
[<img src="https://avatars.githubusercontent.com/u/6828924?v=4" width="100px;"/><br/><sub><b>vagusX</b></sub>](https://github.com/vagusX)<br/>|[<img src="https://avatars.githubusercontent.com/u/566097?v=4" width="100px;"/><br/><sub><b>RaoHai</b></sub>](https://github.com/RaoHai)<br/>

This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto updated at `Thu Mar 28 2024 11:52:18 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->
