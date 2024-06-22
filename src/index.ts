export interface YLRUOptions {
  maxAge?: number;
}

interface CacheItem {
  value: unknown;
  expired: number;
}

export class LRU {
  readonly #max: number;
  #size = 0;
  #cache = new Map<unknown, CacheItem>();
  #_cache = new Map<unknown, CacheItem>();

  constructor(max: number) {
    this.#max = max;
  }

  /** only for unittest */
  get cache() {
    return this.#cache;
  }
  /** only for unittest */
  get _cache() {
    return this.#_cache;
  }

  get<T = unknown>(key: unknown, options?: YLRUOptions): T | undefined {
    let item = this.#cache.get(key);
    const maxAge = options?.maxAge;
    // only call Date.now() when necessary
    let now: number;
    function getNow() {
      now = now || Date.now();
      return now;
    }
    if (item) {
      // check expired
      if (item.expired && getNow() > item.expired) {
        item.expired = 0;
        item.value = undefined;
      } else {
        // update expired in get
        if (maxAge !== undefined) {
          const expired = maxAge ? getNow() + maxAge : 0;
          item.expired = expired;
        }
      }
      return item.value as T;
    }

    // try to read from _cache
    item = this.#_cache.get(key);
    if (item) {
      // check expired
      if (item.expired && getNow() > item.expired) {
        item.expired = 0;
        item.value = undefined;
      } else {
        // not expired, save to cache
        this._update(key, item);
        // update expired in get
        if (maxAge !== undefined) {
          const expired = maxAge ? getNow() + maxAge : 0;
          item.expired = expired;
        }
      }
      return item.value as T;
    }
  }

  set<T = unknown>(key: unknown, value: T, options?: YLRUOptions) {
    const maxAge = options?.maxAge;
    const expired = maxAge ? Date.now() + maxAge : 0;
    let item = this.#cache.get(key);
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

  keys<T = unknown>(): T[] {
    const cacheKeys = new Set<T>();
    const now = Date.now();

    for (const [ key, item ] of this.#cache.entries()) {
      checkEntry(key, item);
    }

    for (const [ key, item ] of this.#_cache.entries()) {
      checkEntry(key, item);
    }

    function checkEntry(key: unknown, item: CacheItem) {
      if (item.value && (!item.expired) || item.expired >= now) {
        cacheKeys.add(key as T);
      }
    }
    return Array.from(cacheKeys);
  }

  reset() {
    this.#size = 0;
    this.#cache.clear();
    this.#_cache.clear();
  }

  _update(key: any, item: CacheItem) {
    this.#cache.set(key, item);
    this.#size++;
    if (this.#size >= this.#max) {
      this.#size = 0;
      this.#_cache = this.#cache;
      this.#cache = new Map();
    }
  }
}
