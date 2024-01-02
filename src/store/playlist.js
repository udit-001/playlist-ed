import { persistentAtom } from '@nanostores/persistent'
import { apiInvidiousInstances } from './invidious.js';

export const recentPlaylists = persistentAtom('recentPlaylists', [], {
    encode: JSON.stringify,
    decode: JSON.parse
});

export const savedPlaylists = persistentAtom('savedPlaylists', [], {
    encode: JSON.stringify,
    decode: JSON.parse
});

export async function fetchPlaylist(playlistId){
    var baseUrl = apiInvidiousInstances.get()[Math.floor(Math.random() * apiInvidiousInstances.get().length)]["uri"];
    const url = baseUrl + "/api/v1/playlists/" + playlistId;
    const response = await fetch(url).then(response => {
    if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json()
    }).then(
        data=>{
            let playlistData = {
                title : data["title"],
                playlistId : data["playlistId"],
                author: data["author"],
                authorImg : data["authorThumbnails"][data["authorThumbnails"].length - 2]["url"],
                playlistThumbnail: data["playlistThumbnail"]
            }
            addRecentPlaylist(playlistData);
            const videos = data['videos'];
            var output = [];
            for (let i = 0; i < videos.length; i++) {
                const videoId = videos[i].videoId;
                const title = videos[i].title;
                output.push({'name': title, 'watchId': videoId});
            }
            return output;
        }
    );
return response;
}

export function addRecentPlaylist(playlistData){
    if (recentPlaylists.get().filter(item => item['playlistId'] == playlistData['playlistId']).length > 0){
        let filteredData = recentPlaylists.get().filter(item => item['playlistId'] != playlistData['playlistId']);
        recentPlaylists.set([playlistData, ...filteredData]);
    }
    else{
        recentPlaylists.set([playlistData, ...recentPlaylists.get()]);
    }
}

export function removeRecentPlaylist(playlistId){
    recentPlaylists.set(recentPlaylists.get().filter(item => item['playlistId'] != playlistId))
}

export function savePlaylist(playlistId){
    let playlistData = recentPlaylists.get().filter(item => item['playlistId'] === playlistId)[0];
    savedPlaylists.set([playlistData, ...savedPlaylists.get()]);
}

export function unsavePlaylist(playlistId){
    savedPlaylists.set(savedPlaylists.get().filter(item => item['playlistId'] != playlistId))
}
