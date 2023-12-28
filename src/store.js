import { persistentAtom } from '@nanostores/persistent'

export const $store = persistentAtom('state', [], {
    encode: JSON.stringify,
    decode: JSON.parse
  });
