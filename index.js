'use strict';

class LRU {
  constructor(max) {
    this.max = max;
    this.size = 0;
    this.cache = new Map();
    this._cache = new Map();
  }

  get(key) {
    let item = this.cache.get(key);
    if (!item) {
      item = this._cache.get(key);
      if (item) this._update(key, item);
    }
    // check expired
    if (item) {
      if (item.expired && Date.now() > item.expired) {
        item.expired = 0;
        item.value = undefined;
      }
      return item.value;
    }
  }

  set(key, value, options) {
    const maxAge = options && options.maxAge || 0;
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
