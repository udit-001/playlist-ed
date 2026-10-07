<div class="video-container">
    <div class="ratio" style="--bs-aspect-ratio: 50%">
        <iframe src={videoUrl} title="video" allowfullscreen class:d-none={loading}></iframe>
        <div class="card-img-top placeholder placeholder-wave opacity-25 w-100" class:d-none={!loading}></div>
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
