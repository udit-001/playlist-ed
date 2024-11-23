import { persistentAtom } from '@nanostores/persistent'

export const useInvidious = persistentAtom("useInvidious", false, {
    encode: JSON.stringify,
    decode: JSON.parse
  });
