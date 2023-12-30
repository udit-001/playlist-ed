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

export const invidiousInstances = persistentAtom('invidiousInstances', [], {
  encode: JSON.stringify,
  decode: JSON.parse
});

export const exampleClicked = atom(0);
export const playlistLink = persistentAtom('playlistLink', '');
export const useInvidious = persistentAtom("useInvidious", true, {
  encode: JSON.stringify,
  decode: JSON.parse
});
export const recentPlaylists = persistentAtom('recentPlaylists', [], {
  encode: JSON.stringify,
  decode: JSON.parse
});

export function addRecentPlaylist(playlistData){
  if (recentPlaylists.get().filter(item => item['playlistId'] == playlistData['playlistId']).length > 0){
    let filteredData = recentPlaylists.get().filter(item => item['playlistId'] != playlistData['playlistId']);
    recentPlaylists.set([playlistData, ...filteredData]);
  }
  else{
    recentPlaylists.set([playlistData, ...recentPlaylists.get()]);
  }
}

export const lessons = atom([]);
export const activeChildIndex = atom(0);
