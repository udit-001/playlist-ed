<Header {loading}/>
<div class="container-fluid mt-3">
    <div class="row">
        <div class="col-lg-12">
            <VideoEmbed {loading}/>
        </div>
      </div>
    <VideoButtons {loading}/>
<Sidebar {loading}/>
</div>

<script>
    import { onMount } from 'svelte';
    import { lessons, invidiousInstances } from '../store.js';
    import VideoEmbed from './VideoEmbed.svelte';
    import Sidebar from './Sidebar.svelte';
    import VideoButtons from './VideoButtons.svelte';
    import Header from './Header.svelte';

    export let id;

    let loading = true;
    let baseUrl;

    async function fetchPlaylist(playlistId){
        const url = baseUrl + "/api/v1/playlists/" + playlistId;
        const response = await fetch(url).then(response => response.json()).then(
            data=>{
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

	onMount(async () => {
        if(id !== undefined){
            let apiInvidiousInstances = $invidiousInstances.filter(item => item['api'] === true);
            baseUrl = apiInvidiousInstances[Math.floor(Math.random() * apiInvidiousInstances.length)]["uri"];
            $lessons = await fetchPlaylist(id);
            loading = false;
        }
        else{
            location.replace("/");
        }
    });
</script>
