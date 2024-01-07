<button type="button" class="btn btn-success mx-auto" on:click={toggleCompleted(videoId)}>
    {#if !completed}<i class="bi bi-check-lg me-1"></i>{:else}<i class="bi bi-x-lg me-1"></i>{/if} Mark as {#if !completed}Complete{:else}Incomplete{/if}
</button>

<script>
    import { lessons, completedVideos } from "../store/state";
    import { markVideoCompleted, unmarkVideoCompleted } from "../store/playlist";
    export let videoId;
    var completed;

    $: {
        completed = $completedVideos.includes(videoId);
    }

    function toggleCompleted(videoId){
        if($completedVideos.includes(videoId) === false){
            $completedVideos = [...$completedVideos, videoId];
            $lessons['completed'] = [...$lessons['completed'], videoId];
            markVideoCompleted($lessons['playlistId'], videoId);
            completed = true;
        }
        else{
            $completedVideos = $completedVideos.filter(item => item !== videoId);
            $lessons['completed'] = $lessons['completed'].filter(item => item === videoId);
            unmarkVideoCompleted($lessons['playlistId'], videoId);
            completed = false;
        }
    }
</script>
