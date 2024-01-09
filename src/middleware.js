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
    return response;
  }


export async function fetchVideoDetails(videoId){
    let instances = await fetchInvidiousInstances();
    let apiInstances = instances.filter(i => i['api'] === true);
    var baseUrl = apiInstances[0]['uri'];
    const url = baseUrl + "/api/v1/videos/" + videoId;
    const data = await fetch(url).then(response => {
        if(!response.ok){
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json()
    })
    return {
        title : data["title"],
        thumbnail: data["videoThumbnails"][0]["url"]
    }
}

export const onRequest = async (context, next) => {
    if (context.url.pathname.includes("lessons") === true) {
        var videoId  = context.url.pathname.split("/")[3];
        var videoData = await fetchVideoDetails(videoId);

        const response = await next();
        const html = await response.text();
        const title = videoData.title + " | Playlist-Ed";
        var updatedHtml = html.replaceAll("META TITLE", title).replaceAll("META IMAGE", videoData.thumbnail).replaceAll("META DESCRIPTION", "View on Playlist-Ed")
        return new Response(updatedHtml, {
            status: 200,
            headers: response.headers
        });
      }
      return next();
    };
