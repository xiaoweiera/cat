/**
 * @file cache
 */

import { uuid } from '~/utils'
import safeGet from '@fengqiaogang/safe-get';

const namespace = 'd';
const cache = sessionStorage;

export const makeKey = function(...args: any) {
  const text: string = JSON.stringify(args)
  // 根据内容生成唯一的 key 值
  return uuid(text)
}

export const keys = function (): string[] {
  const values = Object.keys(cache);
  return values;
};

export const has = function (key: string): boolean {
  const value = keys();
  return value.includes(key);
};

export const get = function <T>(key: string): T | undefined {
  if (has(key)) {
    const value: string | null = cache.getItem(key);
    if (value) {
      const data = JSON.parse(value);
      return safeGet<T>(data, namespace);
    }
  }
  return void 0;
};

export const set = function (key: string, value: any): boolean {
  try {
    const data: any = {};
    data[namespace] = value;
    const text = JSON.stringify(data);
    cache.setItem(key, text);
    return true;
  } catch (e) {
    return false;
  }
};

export const remove = function (key: string): boolean {
  if (has(key)) {
    cache.removeItem(key);
    return true;
  }
  return false;
};
