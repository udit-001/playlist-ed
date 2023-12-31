import { persistentAtom } from '@nanostores/persistent'

export const useInvidious = persistentAtom("useInvidious", true, {
    encode: JSON.stringify,
    decode: JSON.parse
  });
