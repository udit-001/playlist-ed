import { atom, computed } from 'nanostores'
import { persistentAtom } from '@nanostores/persistent'

export const $videoLink = atom('');

export const exampleClicked = atom(0);
export const playlistLink = atom('');

export const playlistId = atom('');

export const lessons = persistentAtom('lessons', {}, {
    encode: JSON.stringify,
    decode: JSON.parse
});

export const sidebarQuery = atom('');
export const normalizedSearchQuery = computed(sidebarQuery, data => data.toLowerCase());

export const nextVideo = atom('');
export const prevVideo = atom('');

// export function searchLessons(){
//     return lessons.get().filter(i => i.name.toLowerCase().includes(normalizedSearchQuery.get()) > 0)
// } 
