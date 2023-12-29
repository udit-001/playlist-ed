<Header />
<div class="container-fluid mt-3">
    <div class="row">
        <div class="col-lg-12">
            <VideoEmbed />
        </div>
      </div>
    <VideoButtons />
<Sidebar /> 
</div>

<script>
    import { onMount } from 'svelte';
    import { lessons, playlistLink } from '../store.js';
    import VideoEmbed from './VideoEmbed.svelte';
    import Sidebar from './Sidebar.svelte';
    import VideoButtons from './VideoButtons.svelte';
    import Header from './Header.svelte';

    function extractPlaylistId(url){
        const urlParams = new URLSearchParams(new URL(url).search);
        return urlParams.get('list');
    }

    let playlistId;

    async function fetchPlaylist(playlistId){
        const feedUrl = 'https://www.youtube.com/feeds/videos.xml?playlist_id=' + playlistId
        const url = "https://cors-anywhere.mittaludit98.workers.dev/" + feedUrl;
        const response = await fetch(url).then(response => response.text()).then(
            data=>{
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(data, "application/xml");
                const entries = xmlDoc.getElementsByTagName('entry');
                var output = [];
                for (let i = 0; i < entries.length; i++) {
                    const videoId = entries[i].getElementsByTagName('yt:videoId')[0].childNodes[0].nodeValue;
                    const title = entries[i].getElementsByTagName('title')[0].childNodes[0].nodeValue;
                    output.push({'name': title, 'watchId': videoId});
                }
                
                return output;
            }
        );
        return response;
    }

	onMount(async () => {
        if($playlistLink != ''){
            playlistId = extractPlaylistId($playlistLink)
            $lessons = await fetchPlaylist(playlistId);
        }
        else{
            location.replace("/");
        }
    });
</script>
