# ylru

**hashlru inspired**

[hashlru](https://github.com/dominictarr/hashlru) is the **Simpler, faster LRU cache algorithm.**
Please checkout [algorithm](https://github.com/dominictarr/hashlru#algorithm) and [complexity](https://github.com/dominictarr/hashlru#complexity) on hashlru.

ylru extends some features base on hashlru:

- cache value can be **expired**.
- cache value can be **empty value**, e.g.: `null`, `undefined`, `''`, `0`

## Usage

```js
const LRU = require('ylru');

const lru = new LRU(100);
lru.set(key, value);
lru.get(key);

// value2 will be expired after 5000ms
lru.set(key2, value2, { maxAge: 5000 });
lru.get(key2);
```

### API

## LRU(max) => lru

initialize a lru object.

### lru.get(key) => value | null

Returns the value in the cache.

### lru.set(key, value[, options])

- `{Number} options.maxAge`: value will become `undefined` after `maxAge` pass.
If `maxAge` not set, value will be never expired.

Set the value for key.

## License

[MIT](LICENSE)
