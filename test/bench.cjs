const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const LRU = require('lru-cache');
const HLRU = require('hashlru');
const { LRU: YLRU } = require('..');

let count = 0;
const hlru = HLRU(1000);
const ylru = new YLRU(1000);
const lru = new LRU({
  max: 10000,
});
const suite = new Benchmark.Suite();

// lru.set(1, 1);
// hlru.set(1, 1);
// console.log(lru.get(1), hlru.get(1));

// add tests
suite

  .add('lru-cache: set once and get once', () => {
    count++;
    const key = `some_long_key_${count}`;
    lru.set(key, key);
    lru.get(key);
  })
  .add('hashlru: set once and get once', () => {
    count++;
    const key = `some_long_key_${count}`;
    hlru.set(key, key);
    hlru.get(key);
  })
  .add('ylru: set once and get once', () => {
    count++;
    const key = `some_long_key_${count}`;
    ylru.set(key, key);
    ylru.get(key);
  })

  .add('lru-cache: set exists', () => {
    const key = `some_long_key_${count}`;
    lru.set(key, key);
  })
  .add('hashlru: set exists', () => {
    const key = `some_long_key_${count}`;
    hlru.set(key, key);
  })
  .add('ylru: set exists', () => {
    const key = `some_long_key_${count}`;
    ylru.set(key, key);
  })

  .add('lru-cache: get exists', () => {
    const key = `some_long_key_${count}`;
    lru.get(key);
  })
  .add('hashlru: get exists', () => {
    const key = `some_long_key_${count}`;
    hlru.get(key);
  })
  .add('ylru: get exists', () => {
    const key = `some_long_key_${count}`;
    ylru.get(key);
  })

  .add('lru-cache: get not exists', () => {
    const key = `some_long_key_${count}`;
    lru.get(key);
  })
  .add('hashlru: get not exists', () => {
    const key = `some_long_key_${count}`;
    hlru.get(key);
  })
  .add('ylru: get not exists', () => {
    const key = `some_long_key_${count}`;
    ylru.get(key);
  })

  .add('ylru: set maxAge and get', () => {
    const key = `some_long_key_${count}`;
    ylru.set(key, key, { maxAge: 1000 });
    ylru.get(key, key, { maxAge: 1000 });
  })

// add listeners
  .on('cycle', event => {
    benchmarks.add(event.target);
  })
  .on('start', () => {
    console.log('\n  node version: %s, date: %s\n  Starting...', process.version, Date());
  })
  .on('complete', () => {
    benchmarks.log();
  })
  .run({ async: false });

// node version: v22.2.0, date: Sat Jun 22 2024 23:10:04 GMT+0800 (中国标准时间)
// Starting...
// 13 tests completed.
//
// lru-cache: set once and get once x  3,920,804 ops/sec ±3.22% (89 runs sampled)
// hashlru: set once and get once   x  2,368,577 ops/sec ±11.13% (70 runs sampled)
// ylru: set once and get once      x  7,038,606 ops/sec ±0.37% (97 runs sampled)
// lru-cache: set exists            x  8,034,810 ops/sec ±1.57% (96 runs sampled)
// hashlru: set exists              x 12,909,243 ops/sec ±0.93% (94 runs sampled)
// ylru: set exists                 x  9,573,259 ops/sec ±0.56% (99 runs sampled)
// lru-cache: get exists            x 10,070,266 ops/sec ±0.29% (100 runs sampled)
// hashlru: get exists              x 14,220,254 ops/sec ±0.38% (98 runs sampled)
// ylru: get exists                 x  9,899,040 ops/sec ±0.30% (95 runs sampled)
// lru-cache: get not exists        x 10,063,086 ops/sec ±0.26% (98 runs sampled)
// hashlru: get not exists          x 14,261,963 ops/sec ±0.35% (101 runs sampled)
// ylru: get not exists             x  9,891,090 ops/sec ±0.30% (99 runs sampled)
// ylru: set maxAge and get         x  5,994,982 ops/sec ±0.67% (100 runs sampled)

// node version: v6.9.2, date: Thu Dec 29 2016 20:42:33 GMT+0800 (CST)
// Starting...
// 13 tests completed.
//
// lru-cache: set once and get once x   327,525 ops/sec ±10.62% (71 runs sampled)
// hashlru: set once and get once   x   711,891 ops/sec ±16.96% (71 runs sampled)
// ylru: set once and get once      x 1,424,629 ops/sec ±10.75% (66 runs sampled)
// lru-cache: set exists            x   749,212 ops/sec ±9.37% (79 runs sampled)
// hashlru: set exists              x 1,692,087 ops/sec ±2.08% (78 runs sampled)
// ylru: set exists                 x 3,285,851 ops/sec ±2.49% (85 runs sampled)
// lru-cache: get exists            x 2,141,848 ops/sec ±2.70% (83 runs sampled)
// hashlru: get exists              x 3,701,252 ops/sec ±4.45% (74 runs sampled)
// ylru: get exists                 x 3,166,543 ops/sec ±5.11% (76 runs sampled)
// lru-cache: get not exists        x 2,263,027 ops/sec ±1.10% (86 runs sampled)
// hashlru: get not exists          x 4,259,813 ops/sec ±0.84% (87 runs sampled)
// ylru: get not exists             x 3,526,317 ops/sec ±0.95% (84 runs sampled)
// ylru: set maxAge and get         x 1,707,484 ops/sec ±0.93% (83 runs sampled)
