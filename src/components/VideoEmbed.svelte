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

    // YouTube removed the parameters that used to strip its own chrome
    // (modestbranding in 2023, showinfo in 2018), so the title and channel
    // avatar always show before playback, on pause, and at the end. These are
    // the ones that still do something:
    //   rel=0            related videos limited to the same channel
    //   iv_load_policy=3 no annotation cards
    //   playsinline=1    no forced fullscreen on iOS
    //   color=white      progress bar matches the dark theme
    const EMBED_PARAMS = 'rel=0&iv_load_policy=3&playsinline=1&color=white';

    let videoUrl;

    $: {
        if(Object.keys($lessons).length !== 0){
            videoUrl = "https://www.youtube.com/embed/" + videoId + "?" + EMBED_PARAMS;
        }
    }
</script>
