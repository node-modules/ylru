import * as LRU from '../../..';

import assert = require('assert');

const lru = new LRU(100);

assert(lru instanceof LRU);

lru.set('foo', 'bar', {  maxAge: 1000 });
assert(lru.get('foo') === 'bar');
