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
    ).catch(error => null)
    if(response){
        return response;
    }
    else{
        return null;
    }
  }


export async function fetchVideoDetails(videoId){
    let instances = await fetchInvidiousInstances();
    if(instances !== null){
        let apiInstances = instances.filter(i => i['api'] === true);
        var baseUrl = apiInstances[0]['uri'];
        const url = baseUrl + "/api/v1/videos/" + videoId;
        const data = await fetch(url).then(response => {
            if(!response.ok){
                return null;
            }
            return response.json()
        }).catch((e)  => {
            console.log(e);
        })
        if (data){
            return {
                title : data["title"],
                thumbnail: data["videoThumbnails"][0]["url"]
            }
        }
        else{
            return null
        }

    }
    else{
        return null;
    }
}

export const onRequest = async (context, next) => {
    if (context.url.pathname.includes("lessons") === true) {
        var videoId  = context.url.pathname.split("/")[3];
        var videoData = await fetchVideoDetails(videoId);
        if(videoData !== null){
            const response = await next();
            const html = await response.text();
            const title = videoData.title + " | Playlist-Ed";
            var updatedHtml = html.replaceAll("META TITLE", title).replaceAll("META IMAGE", videoData.thumbnail).replaceAll("META DESCRIPTION", "View on Playlist-Ed")
            return new Response(updatedHtml, {
                status: 200,
                headers: response.headers
            });
        }
        else{
            const response = await next();
            const html = await response.text();
            var title = "Playlist-Ed: Your solution to chaotic study sessions";
            var thumbnail = "/images/playlist-ed-banner.png";
            var description = "Streamline your study sessions by curating clutter-free, uninterrupted playlists for your focused learning.";
            var updatedHtml = html.replaceAll("META TITLE", title).replaceAll("META IMAGE", thumbnail).replaceAll("META DESCRIPTION", description)
            return new Response(updatedHtml, {
                status: 200,
                headers: response.headers
            });
        }
    }
    return next();
    };
