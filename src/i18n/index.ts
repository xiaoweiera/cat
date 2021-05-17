/**
 * @file 国际化
 */

import kiwi from './kiwi';

try {
  if (window) {
    (window as any).intlFormat = kiwi;
  }
} catch (error) {
  // todo
}

export default kiwi;