<div class="video-container">
    <div class="ratio" style="--bs-aspect-ratio: 50%">
        <iframe src="{videoUrl}" title="video" allowfullscreen></iframe>
    </div>
</div>


<script>
    import { useInvidious, lessons, activeChildIndex } from "../store.js";

    let videoId;

    let baseUrl, videoUrl, currentIndex;

    if($useInvidious == 1){
        baseUrl = "https://yewtu.be/embed/";
    }
    else{
        baseUrl = "https://youtube.com/embed/";
    }

    $: {
        if($lessons.length !== 0){
            currentIndex = $activeChildIndex;
            videoId = $lessons[currentIndex].watchId;
            videoUrl = baseUrl + videoId;
        }
    }
</script>
