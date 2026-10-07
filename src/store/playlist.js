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

async function fetchPlaylistFromInvidious(playlistId){
    const instances = apiInvidiousInstances.get();
    if(instances.length === 0){
        return null;
    }

    const baseUrl = instances[Math.floor(Math.random() * instances.length)]["uri"];
    const response = await fetch(baseUrl + "/api/v1/playlists/" + playlistId);
    if(!response.ok){
        throw new Error(`Invidious responded with ${response.status}`);
    }

    const data = await response.json();
    const videos = data['videos'] ?? [];
    if(videos.length === 0){
        return null;
    }

    return {
        title: data['title'],
        playlistId: data['playlistId'] ?? playlistId,
        author: data['author'],
        authorImg: data['authorThumbnails'][data['authorThumbnails'].length - 2]['url'],
        playlistThumbnail: data['playlistThumbnail'],
        videoCount: data['videoCount'],
        recentVideo: videos[0].videoId,
        videos: videos.map(video => ({ name: video.title, watchId: video.videoId }))
    };
}

async function fetchPlaylistFromApi(playlistId){
    const response = await fetch('/api/playlist?id=' + encodeURIComponent(playlistId));
    if(!response.ok){
        // Prefer the endpoint's reason over a bare status code.
        let reason = null;
        try{
            reason = (await response.json())?.error;
        }
        catch{
            // Body was not JSON; fall through to the status.
        }
        throw new Error(reason ?? `Playlist API responded with ${response.status}`);
    }
    return await response.json();
}

const RETRY_DELAY_MS = 600;
const MAX_ATTEMPTS = 2;

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

// One pass: Invidious first, then our endpoint.
async function acquirePlaylist(playlistId){
    let data = null;

    try{
        data = await fetchPlaylistFromInvidious(playlistId);
    }
    catch(error){
        console.warn('Invidious lookup failed, falling back to the playlist API.', error);
    }

    if(data === null){
        data = await fetchPlaylistFromApi(playlistId);
    }

    return data;
}

export async function fetchPlaylist(playlistId){
    let data = null;
    let lastError = null;

    // A transient failure was observed in production; one retry absorbs that class.
    for(let attempt = 0; attempt < MAX_ATTEMPTS && data === null; attempt++){
        if(attempt > 0){
            await delay(RETRY_DELAY_MS);
        }
        try{
            const candidate = await acquirePlaylist(playlistId);
            if(Array.isArray(candidate?.videos) && candidate.videos.length > 0){
                data = candidate;
            }
        }
        catch(error){
            lastError = error;
            console.warn(`Playlist lookup attempt ${attempt + 1} failed.`, error);
        }
    }

    if(data === null){
        throw lastError ?? new Error('That playlist has no videos.');
    }

    // Stored without the video list; the lesson page refetches it.
    const { videos, ...metadata } = data;
    const playlistData = { ...metadata, completed: [] };
    addRecentPlaylist(playlistData);

    return { ...playlistData, videos };
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
