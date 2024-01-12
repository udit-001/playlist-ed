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
    if(apiInvidiousInstances.get().length > 0){
        var baseUrl = apiInvidiousInstances.get()[Math.floor(Math.random() * apiInvidiousInstances.get().length)]["uri"];
        const url = baseUrl + "/api/v1/playlists/" + playlistId;
        const response = await fetch(url).then(response => {
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json()
        }).then(
            data=>{
                var playlistData = {
                    title : data["title"],
                    playlistId : data["playlistId"],
                    author: data["author"],
                    authorImg : data["authorThumbnails"][data["authorThumbnails"].length - 2]["url"],
                    playlistThumbnail: data["playlistThumbnail"],
                    videoCount: data['videoCount'],
                    completed: []
                }
                const videos = data['videos'];
                var output = [];
                for (let i = 0; i < videos.length; i++) {
                    if(i === 0){
                        playlistData['recentVideo'] = videos[i].videoId;
                    }
                    const videoId = videos[i].videoId;
                    const title = videos[i].title;
                    output.push({'name': title, 'watchId': videoId});
                }
                addRecentPlaylist(playlistData);
                playlistData["videos"] = output;
                return playlistData;
            }
        );
        return response;
    }
    else{
        return null;
    }
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

export function addRecentVideo(playlistId, videoId){
    if(savedPlaylists.get().filter(item => item['playlistId'] === playlistId).length > 0){
        var playlistData = savedPlaylists.get().filter(item => item['playlistId'] === playlistId)[0];
        playlistData['recentVideo'] = videoId;
        var filteredData = savedPlaylists.get().filter(item => item['playlistId'] !== playlistId);
        savedPlaylists.set([playlistData, ...filteredData]);
    }

    if(recentPlaylists.get().filter(item => item['playlistId'] === playlistId).length > 0){
        var playlistData = recentPlaylists.get().filter(item => item['playlistId'] === playlistId)[0];
        playlistData['recentVideo'] = videoId;
        var filteredData = recentPlaylists.get().filter(item => item['playlistId'] !== playlistId);
        recentPlaylists.set([playlistData, ...filteredData]);
    }
}


export function markVideoCompleted(playlistId, videoId){
    if(savedPlaylists.get().filter(item => item['playlistId'] === playlistId).length > 0){
        var playlistData = savedPlaylists.get().filter(item => item['playlistId'] === playlistId)[0];
        playlistData['completed'].push(videoId);
        var filteredData = savedPlaylists.get().filter(item => item['playlistId'] !== playlistId);
        savedPlaylists.set([playlistData, ...filteredData]);
    }

    if(recentPlaylists.get().filter(item => item['playlistId'] === playlistId).length > 0){
        var playlistData = recentPlaylists.get().filter(item => item['playlistId'] === playlistId)[0];
        playlistData['completed'].push(videoId);
        var filteredData = recentPlaylists.get().filter(item => item['playlistId'] !== playlistId);
        recentPlaylists.set([playlistData, ...filteredData]);
    }
}


export function unmarkVideoCompleted(playlistId, videoId){
    if(savedPlaylists.get().filter(item => item['playlistId'] === playlistId).length > 0){
        var playlistData = savedPlaylists.get().filter(item => item['playlistId'] === playlistId)[0];
        playlistData['completed'] = playlistData['completed'].filter(item => item !== videoId);
        var filteredData = savedPlaylists.get().filter(item => item['playlistId'] !== playlistId);
        savedPlaylists.set([playlistData, ...filteredData]);
    }

    if(recentPlaylists.get().filter(item => item['playlistId'] === playlistId).length > 0){
        var playlistData = recentPlaylists.get().filter(item => item['playlistId'] === playlistId)[0];
        playlistData['completed'] = playlistData['completed'].filter(item => item !== videoId);
        var filteredData = recentPlaylists.get().filter(item => item['playlistId'] !== playlistId);
        recentPlaylists.set([playlistData, ...filteredData]);
    }
}
