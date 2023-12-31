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


export async function fetchInvidiousInstances(){
  let invidiousAPIUrl = 'https://api.invidious.io/instances.json?sort_by=health'
  const response = await fetch(invidiousAPIUrl).then(response => response.json()).then(
      data => {
          let filteredUrls = [];
          for(let i = 0; i < data.length; i++){
              var currentItem = data[i][1];
              if(currentItem['type'] === 'https'){
                  if(currentItem.hasOwnProperty('stats')){
                      var stats = currentItem['stats'];
                      if(
                          stats != null && Object.keys(stats['playback']).length > 0){
                          if(stats['playback']['ratio'] > 0.0){
                              filteredUrls.push({
                                  "uri": currentItem["uri"],
                                  "cors": currentItem["cors"],
                                  "api": currentItem["api"]
                              });
                          }
                      }
                      else if(parseFloat(currentItem['monitor']['30dRatio']['ratio']) > 0.0){
                          filteredUrls.push({
                              "uri": currentItem["uri"],
                              "cors": currentItem["cors"],
                              "api": currentItem["api"]
                          });
                      }
                  }
              }
          }
          return filteredUrls;
      }
  )
  invidiousInstances.set(response);
}

export const exampleClicked = atom(0);
export const playlistLink = atom('');
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

export function removePlaylist(playlistId){
  recentPlaylists.set(recentPlaylists.get().filter(item => item['playlistId'] != playlistId))
}

export const lessons = atom([]);
export const activeChildIndex = atom(0);
