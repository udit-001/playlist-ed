import { defineMiddleware } from "astro/middleware";

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
                        else if(currentItem['monitor'] !== null && parseFloat(currentItem['monitor']['30dRatio']['ratio']) > 0.0){
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
  }


export async function fetchPlaylistDetails(playlistId){
    let instances = await fetchInvidiousInstances();
    let apiInstances = instances.filter(i => i['api'] === true)
    var baseUrl = apiInstances[Math.floor[Math.random() * apiInstances.length]]['uri'];
    const response = await fetch(url).then(response => {
        if(!response.ok){
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json()
    })
    return {
        title : data["title"],
        playlistId : data["playlistId"],
        author: data["author"],
        authorImg : data["authorThumbnails"][data["authorThumbnails"].length - 2]["url"],
        playlistThumbnail: data["playlistThumbnail"]
    }
}

export const onRequest = async (context, next) => {
    if (context.url.pathname.includes("lessons") > 0) {
        var { playlistId } = context.url.params;
        var playlistData = await fetchPlaylistDetails(playlistId);

        return new Response(JSON.stringify(playlistData),
          {
            status: 200,
          }
        );
      }
      return next();
    };
