import * as LRU from '../../..';

import assert = require('assert');

const lru = new LRU(100);

assert(lru instanceof LRU);
