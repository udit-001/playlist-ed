{#if $invidiousInstances.length > 0}
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
{/if}

<script>
    import { onMount } from 'svelte';
    import { lessons, invidiousInstances, addRecentPlaylist, fetchInvidiousInstances } from '../store.js';
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
                let playlistData = {
                    title : data["title"],
                    playlistId : data["playlistId"],
                    author: data["author"],
                    authorImg : data["authorThumbnails"][data["authorThumbnails"].length - 2]["url"]
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

	onMount(async () => {
        if(id !== undefined){
            if($invidiousInstances.length == 0){
                await fetchInvidiousInstances();
            }
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
