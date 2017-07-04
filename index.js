'use strict';

class LRU {
  constructor(max) {
    this.max = max;
    this.size = 0;
    this.cache = new Map();
    this._cache = new Map();
  }

  get(key, options) {
    let item = this.cache.get(key);
    const maxAge = options && options.maxAge;
    if (item) {
      const now = Date.now();
      // check expired
      if (item.expired && now > item.expired) {
        item.expired = 0;
        item.value = undefined;
      } else {
        // update expired in get
        if (maxAge !== undefined) {
          const expired = maxAge ? now + maxAge : 0;
          item.expired = expired;
        }
      }
      return item.value;
    }

    // try to read from _cache
    item = this._cache.get(key);
    if (item) {
      const now = Date.now();
      // check expired
      if (item.expired && now > item.expired) {
        item.expired = 0;
        item.value = undefined;
      } else {
        // not expired, save to cache
        this._update(key, item);
        // update expired in get
        if (maxAge !== undefined) {
          const expired = maxAge ? now + maxAge : 0;
          item.expired = expired;
        }
      }
      return item.value;
    }
  }

  set(key, value, options) {
    const maxAge = options && options.maxAge;
    const expired = maxAge ? Date.now() + maxAge : 0;
    let item = this.cache.get(key);
    if (item) {
      item.expired = expired;
      item.value = value;
    } else {
      item = {
        value,
        expired,
      };
      this._update(key, item);
    }
  }

  _update(key, item) {
    this.cache.set(key, item);
    this.size++;
    if (this.size >= this.max) {
      this.size = 0;
      this._cache = this.cache;
      this.cache = new Map();
    }
  }
}

module.exports = LRU;
