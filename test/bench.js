'use strict';

const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const HLRU = require('hashlru');
const LRU = require('../');

let count = 0;
const hlru = HLRU(1000);
const ylru = new LRU(1000);
const suite = new Benchmark.Suite();

// lru.set(1, 1);
// hlru.set(1, 1);
// console.log(lru.get(1), hlru.get(1));

// add tests
suite
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
.add('hashlru: set exists', () => {
  const key = `some_long_key_${count}`;
  hlru.set(key, key);
})
.add('ylru: set exists', () => {
  const key = `some_long_key_${count}`;
  ylru.set(key, key);
})
.add('hashlru: get exists', () => {
  const key = `some_long_key_${count}`;
  hlru.get(key);
})
.add('ylru: get exists', () => {
  const key = `some_long_key_${count}`;
  ylru.get(key);
})
.add('hashlru: get not exists', () => {
  const key = `some_long_key_${count}`;
  hlru.get(key);
})
.add('ylru: get not exists', () => {
  const key = `some_long_key_${count}`;
  ylru.get(key);
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

// node version: v6.9.2, date: Thu Dec 29 2016 20:33:53 GMT+0800 (CST)
// Starting...
// 8 tests completed.
//
// hashlru: set once and get once x   671,063 ops/sec ±9.30% (73 runs sampled)
// ylru: set once and get once    x 1,535,626 ops/sec ±4.01% (67 runs sampled)
// hashlru: set exists            x 2,123,299 ops/sec ±1.82% (87 runs sampled)
// ylru: set exists               x 3,352,376 ops/sec ±0.77% (83 runs sampled)
// hashlru: get exists            x 2,946,222 ops/sec ±3.68% (82 runs sampled)
// ylru: get exists               x 3,487,940 ops/sec ±0.92% (87 runs sampled)
// hashlru: get not exists        x 3,114,524 ops/sec ±1.56% (86 runs sampled)
// ylru: get not exists           x 3,411,453 ops/sec ±1.51% (84 runs sampled)
