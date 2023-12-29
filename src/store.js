import { persistentAtom } from '@nanostores/persistent'
import { atom } from 'nanostores'


export const $store = persistentAtom('state', [], {
    encode: JSON.stringify,
    decode: JSON.parse
});

export const $videoLink = atom('');

export function storeData(data) {
  $store.set([...$store.get(), user]);
}
export const exampleClicked = atom(0);
export const playlistLink = persistentAtom('playlistLink', '');
export const useInvidious = persistentAtom("useInvidious", 1);
export const lessons = atom([]);
export const activeChildIndex = atom(0);
