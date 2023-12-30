<div class="video-container">
    <div class="ratio" style="--bs-aspect-ratio: 50%">
        <iframe src="{videoUrl}" title="video" allowfullscreen class:d-none={loading}></iframe>
        <div class="card-img-top placeholder placeholder-wave opacity-25 w-100" class:d-none={!loading}></div>
    </div>
</div>


<script>
    import { useInvidious, lessons, activeChildIndex, invidiousInstances } from "../store.js";
    export let loading;

    let videoId;

    let baseUrl, videoUrl, currentIndex;

    if($useInvidious === true){
        baseUrl = $invidiousInstances[Math.floor(Math.random() * $invidiousInstances.length)] + "/embed/";
    }
    else{
        baseUrl = "https://youtube.com/embed/";
    }

    $: {
        if($lessons.length !== 0){
            currentIndex = $activeChildIndex;
            videoId = $lessons[currentIndex].watchId;
            videoUrl = baseUrl + videoId;

            if($useInvidious === true){
                videoUrl += "?quality=dash"
            }
        }
    }
</script>
