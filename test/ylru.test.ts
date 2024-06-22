import { strict as assert } from 'node:assert';
import { setTimeout as sleep } from 'node:timers/promises';
import { LRU } from '../src/index.js';

describe('ylru tests', () => {
  describe('normal', () => {
    it('key is string', () => {
      const lru = new LRU(10);
      lru.set('foo', 'bar');
      assert(lru.get('foo') === 'bar');
    });

    it('key is number', () => {
      const lru = new LRU(10);
      lru.set(1, 'bar');
      assert(lru.get(1) === 'bar');
    });

    it('key is obj', () => {
      const lru = new LRU(10);
      const obj = { hi: 'foo' };
      lru.set(obj, 'bar');
      assert(lru.get(obj) === 'bar');
    });

    it('value is empty value', () => {
      const lru = new LRU(10);
      lru.set('foo', 'bar');
      assert(lru.get('foo') === 'bar');
      lru.set('foo', null);
      assert(lru.get('foo') === null);
      lru.set('foo', undefined);
      assert(lru.get('foo') === undefined);
      lru.set('foo', 0);
      assert(lru.get('foo') === 0);
      lru.set('foo', '');
      assert(lru.get('foo') === '');
    });

    it('value is obj', () => {
      const lru = new LRU(10);
      lru.set('foo', { foo: 'bar' });
      assert.deepEqual(lru.get('foo'), { foo: 'bar' });
    });

    it('expired value should not copy', async () => {
      const lru = new LRU(2);
      lru.set('foo1', 'bar');
      lru.set('foo', 'bar', { maxAge: 2 });
      assert.equal(lru.cache.size, 0);
      assert.equal(lru._cache.size, 2);

      await sleep(10);
      assert(lru.get('foo') === undefined);
      assert(lru.get('foo1') === 'bar');
      assert.equal(lru.cache.size, 1);
      assert.equal(lru._cache.size, 2);

      await sleep(10);
      assert(lru.get('foo') === undefined);
      assert(lru.get('foo1') === 'bar');
      assert.equal(lru.cache.size, 1);
      assert.equal(lru._cache.size, 2);

      lru.set('foo2', 'bar');
      assert.equal(lru.cache.size, 0);
      assert.equal(lru._cache.size, 2);
      assert(lru.get('foo') === undefined);
      assert(lru.get('foo2') === 'bar');
      assert.equal(lru.cache.size, 1);
      assert.equal(lru._cache.size, 2);
    });

    it('item count overflow max', () => {
      const lru = new LRU(10);
      for (let i = 0; i < 10; i++) {
        lru.set(i, i);
      }
      // cache should be new Map()
      assert.equal(lru.cache.size, 0);
      assert.equal(lru._cache.size, 10);
      for (let i = 10; i < 20; i++) {
        lru.set(i, i);
      }
      assert(lru.cache.size === 0);
      assert(lru._cache.size === 10);
      assert(lru.get(0) === undefined);
      assert(lru.get(1) === undefined);
      assert(lru.get(9) === undefined);
      assert(lru.cache.size === 0);
      assert(lru._cache.size === 10);
      assert(lru.get(10) === 10);
      assert.equal(lru.cache.size, 1);
      assert(lru.get(11) === 11);
      assert.equal(lru.cache.size, 2);
      assert(lru.get(19) === 19);
      assert(lru.cache.size === 3);

      lru.set(20, 20);
      lru.set(20, 20);
      assert(lru.get(20) === 20);
      assert(lru.get(10) === 10);

      for (let i = 20; i < 27; i++) {
        lru.set(i, i);
      }
      assert(lru.cache.size === 0);
      assert(lru._cache.size === 10);
      assert(lru.get(10) === 10);
      assert(lru.get(26) === 26);
      assert(lru.cache.size === 2);
    });
  });

  describe('set with options.maxAge', () => {
    [ 1, 10, 100, 1000, 1500, 2000 ].forEach(maxAge => {
      it(`maxAge=${maxAge}`, async () => {
        const lru = new LRU(10);
        lru.set(1, 0, { maxAge });
        lru.set('k2', 'v2', { maxAge });
        lru.set('k3', { foo: 'bar' }, { maxAge });
        assert(lru.get(1) === 0);
        assert(lru.get('k2') === 'v2');
        assert.deepEqual(lru.get('k3'), { foo: 'bar' });

        await sleep(maxAge + 10);
        assert(lru.get(1) === undefined);
        assert(lru.get('k2') === undefined);
        assert(lru.get('k3') === undefined);
        assert(lru.get(1) === undefined);
        assert(lru.get('k2') === undefined);
        assert(lru.get('k3') === undefined);
      });
    });
  });

  describe('get with options.maxAge', () => {
    [ 100, 1000, 1500, 2000 ].forEach(maxAge => {
      it(`maxAge=${maxAge}`, async () => {
        const lru = new LRU(10);
        lru.set(1, 0, { maxAge });
        lru.set('k2', 'v2', { maxAge });
        lru.set('k3', { foo: 'bar' }, { maxAge });
        assert(lru.get(1) === 0);
        assert(lru.get('k2') === 'v2');
        assert.deepEqual(lru.get('k3'), { foo: 'bar' });

        await sleep(maxAge - 10);
        assert(lru.get(1, { maxAge }) !== undefined);
        assert(lru.get('k2', { maxAge }) !== undefined);
        assert(lru.get('k3', { maxAge }) !== undefined);

        await sleep(maxAge - 10);
        assert(lru.get(1) !== undefined);
        assert(lru.get('k2') !== undefined);
        assert(lru.get('k3') !== undefined);
        assert(lru.get(1) !== undefined);
        assert(lru.get('k2') !== undefined);
        assert(lru.get('k3') !== undefined);
      });
    });

    it('can update expired to 0', async () => {
      const lru = new LRU(10);
      lru.set('foo', 'bar', { maxAge: 100 });
      lru.get('foo', { maxAge: 0 });
      await sleep(200);
      assert(lru.get('foo') === 'bar');
    });

    it('can update expired when item in _cache', async () => {
      const lru = new LRU(2);
      lru.set('foo1', 'bar');
      lru.set('foo2', 'bar', { maxAge: 100 });
      lru.get('foo1', { maxAge: 100 });
      await sleep(50);
      assert(lru.get('foo1') === 'bar');
      assert(lru.get('foo2', { maxAge: 0 }) === 'bar');
      await sleep(120);
      assert(!lru.get('foo'));
      assert(lru.get('foo2') === 'bar');
      assert.deepEqual(lru.keys(), [ 'foo2' ]);
    });
  });

  describe('keys', () => {
    it('should work with no expired', () => {
      const lru = new LRU(5);
      lru.set('foo1', 'bar');
      lru.set('foo2', 'bar');
      lru.set('foo3', 'bar');
      lru.set('foo4', 'bar');
      lru.set('foo5', 'bar');
      lru.set('foo6', 'bar');
      // will be more than 5 because ylru's cache strategy
      assert(lru.keys().length === 6);
    });

    it('should work with expired', async () => {
      const lru = new LRU(5);
      lru.set('foo1', 'bar', { maxAge: 100 });
      lru.set('foo2', 'bar', { maxAge: 100 });
      lru.set('foo3', 'bar', { maxAge: 100 });
      lru.set('foo4', 'bar', { maxAge: 200 });
      lru.set('foo5', 'bar', { maxAge: 200 });
      lru.set('foo6', 'bar', { maxAge: 200 });
      await sleep(120);
      assert(lru.keys().length === 3);
      await sleep(120);
      assert(lru.keys().length === 0);
    });
  });

  describe('reset', () => {
    it('should reset cache', () => {
      const lru = new LRU(5);
      lru.set('foo1', 'bar');
      lru.set('foo2', 'bar');
      lru.set('foo3', 'bar');
      assert(lru.keys().length === 3);
      lru.reset();
      assert(lru.keys().length === 0);
    });
  });
});
