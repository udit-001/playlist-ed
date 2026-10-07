<button type="button" class="btn btn-success mx-auto" class:d-none={loading} class:finished={justFinished} on:animationend={() => justFinished = false} on:click={toggleCompleted(videoId)}>
    {#if !completed}<i class="bi bi-check-lg me-1"></i>{:else}<i class="bi bi-x-lg me-1"></i>{/if} Mark as {#if !completed}Complete{:else}Incomplete{/if}
</button>

<script>
    import { lessons, completedVideos } from "../store/state";
    import { markVideoCompleted, unmarkVideoCompleted } from "../store/playlist";
    export let videoId;
    export let loading;
    var completed;
    let justFinished = false;

    $: {
        completed = $completedVideos.includes(videoId);
    }

    function toggleCompleted(videoId){
        if($completedVideos.includes(videoId) === false){
            const total = $lessons['videos']?.length ?? 0;
            $completedVideos = [...$completedVideos, videoId];
            $lessons['completed'] = [...$lessons['completed'], videoId];
            markVideoCompleted($lessons['playlistId'], videoId);
            completed = true;
            justFinished = total > 0 && $completedVideos.length === total;
        }
        else{
            $completedVideos = $completedVideos.filter(item => item !== videoId);
            $lessons['completed'] = $lessons['completed'].filter(item => item !== videoId);
            unmarkVideoCompleted($lessons['playlistId'], videoId);
            completed = false;
        }
    }
</script>

<style>
    /* Finishing a playlist is rare and high-emotion, so it is the one place a
       pulse is earned. Keyframes are fine here: it cannot fire rapidly. */
    @keyframes finished-pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.04); }
        100% { transform: scale(1); }
    }

    .btn.finished {
        animation: finished-pulse 200ms var(--ease-out);
    }
</style>
