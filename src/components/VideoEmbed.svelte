<div class="video-container">
    <div class="ratio" style="--bs-aspect-ratio: 50%">
        <iframe src={videoUrl} title="video" allowfullscreen class:faded={loading}></iframe>
        <div class="card-img-top placeholder placeholder-wave w-100" class:faded={!loading}></div>
    </div>
</div>


<script>
    import { lessons } from "../store/state.js";

    export let loading;
    export let videoId;

    // modestbranding and showinfo no longer work, so YouTube's title and channel
    // avatar cannot be hidden from an embed.
    const EMBED_PARAMS = 'rel=0&iv_load_policy=3&playsinline=1&color=white';

    let videoUrl;

    $: {
        if(Object.keys($lessons).length !== 0){
            videoUrl = "https://www.youtube.com/embed/" + videoId + "?" + EMBED_PARAMS;
        }
    }
</script>

<style>
    /* .ratio absolutely positions both children on top of each other, so they
       crossfade instead of snapping through display:none. */
    .ratio > iframe,
    .ratio > .placeholder {
        transition: opacity 150ms var(--ease-out);
    }

    .ratio > .placeholder {
        opacity: 0.25;
    }

    .ratio > .faded {
        opacity: 0;
        pointer-events: none;
    }
</style>
