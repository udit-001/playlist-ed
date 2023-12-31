import { persistentAtom } from '@nanostores/persistent'
import { computed } from 'nanostores'


export const invidiousInstances = persistentAtom('invidiousInstances', [], {
    encode: JSON.stringify,
    decode: JSON.parse
});

export const apiInvidiousInstances = computed(invidiousInstances, instances => instances.filter(i => i['api'] === true))

export const activeInvidiousIndex = persistentAtom('activeInvidiousIndex', 0);

export async function fetchInvidiousInstances(){
  let invidiousAPIUrl = 'https://api.invidious.io/instances.json?sort_by=health'
  const response = await fetch(invidiousAPIUrl).then(response => response.json()).then(
      data => {
          let filteredUrls = [];
          for(let i = 0; i < data.length; i++){
              var currentItem = data[i][1];
              if(currentItem['type'] === 'https'){
                  if(currentItem["uri"] === "https://invidious.perennialte.ch"){
                    continue;
                  }
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
  activeInvidiousIndex.set(Math.floor(Math.random() * invidiousInstances.get().length));
}
