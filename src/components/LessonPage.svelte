{#if $invidiousInstances.length > 0}
<Header {loading} {videoId}/>
<div class="container-fluid mt-3">
    <div class="row">
        <div class="col-lg-12">
            <VideoEmbed {loading} {videoId}/>
        </div>
      </div>
    <VideoButtons {loading} {videoId}>
        <MarkCompleted {videoId}/>
    </VideoButtons>
<Sidebar {loading} {videoId}/>
</div>
{/if}

<script>
    import { onMount } from 'svelte';
    import { invidiousInstances, fetchInvidiousInstances } from '../store/invidious.js';
    import { fetchPlaylist, addRecentVideo } from '../store/playlist.js';
    import { lessons, nextVideo, prevVideo, sidebarQuery, completedVideos } from '../store/state.js';
    import MarkCompleted from './MarkCompleted.svelte'
    import VideoEmbed from './VideoEmbed.svelte';
    import Sidebar from './Sidebar.svelte';
    import VideoButtons from './VideoButtons.svelte';
    import Header from './Header.svelte';
    import { navigate } from 'astro:transitions/client';

    export let playlistId;
    export let videoId;
    export let query;

    var loading = true;
    var currentIndex;

	onMount(async () => {
        if(playlistId !== undefined){
            try{
                if($invidiousInstances.length == 0){
                    await fetchInvidiousInstances();
                }
                if(Object.keys($lessons).length === 0 || $lessons['playlistId'] !== playlistId){
                    $lessons = await fetchPlaylist(playlistId);
                    currentIndex = $lessons['videos'].findIndex(item => item['watchId'] == videoId);
                    if(currentIndex > 0){
                        $prevVideo = $lessons['videos'][currentIndex - 1]['watchId'];
                    }
                    if(currentIndex < $lessons['videos'].length - 1){
                        $nextVideo = $lessons['videos'][currentIndex + 1]['watchId'];
                    }
                    loading = false;
                    $completedVideos = [];
                }
                else{
                    currentIndex = $lessons['videos'].findIndex(item => item['watchId'] == videoId);
                    if(currentIndex > 0){
                        $prevVideo = $lessons['videos'][currentIndex - 1]['watchId'];
                    }
                    if(currentIndex < $lessons.videos.length - 1){
                        $nextVideo = $lessons['videos'][currentIndex + 1]['watchId'];
                    }
                    loading = false;
                    $completedVideos = $lessons['completed'];
                }
                if(query !== undefined){
                    var search = new URLSearchParams(query);
                    if(typeof search.get("q") == "string"){
                        $sidebarQuery = search.get("q");
                    }
                }
                addRecentVideo(playlistId, videoId);
            }
            catch{
                navigate("/");
            }
        }
    });
</script>
