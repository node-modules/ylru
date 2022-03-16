export interface YLRUOptions {
  maxAge?: number;
}

declare class YLRU {
  constructor(max: number)
  get: <T = any>(key: any, options?: YLRUOptions) => T | undefined;
  set: <T = any>(key: any, value: T, options?: YLRUOptions) => void;
  keys: () => any[];
}

declare module 'ylru' {
  export = YLRU;
}
