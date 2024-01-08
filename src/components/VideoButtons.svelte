<div class="row mt-3">
    <div class="d-flex justify-content-between position-relative" class:flex-row-reverse={loading}>
        <a href="./{$prevVideo}" type="button" class="btn btn-primary btn-lg" class:d-none={$prevVideo === ""}>
            <i class="fa-solid fa-chevron-left"></i> Previous
        </a>
        <slot />
        <a href="./{$nextVideo}" type="button" class="btn btn-primary btn-lg" class:d-none={$nextVideo === ""}>
            Next <i class="fa-solid fa-chevron-right"></i>
        </a>
        <span class="placeholder placeholder-lg placeholder-wave bg-primary p-3" class:specific-w-150={loading} class:d-none={!loading}></span>
    </div>
</div>

<script>
    import { lessons, sidebarQuery, prevVideo, nextVideo } from '../store/state.js';
    export let loading;
    export let videoId;
    var currentIndex;
    var queryset;

    $: {
        if(Object.keys($lessons).length !== 0){
            if ($sidebarQuery !== "") {
                queryset = $lessons['videos'].filter(item => item.name.toLowerCase().includes($sidebarQuery.toLowerCase()));
            } else {
                queryset = $lessons['videos'];
            }

            currentIndex = queryset.findIndex(item => item['watchId'] == videoId);
            $prevVideo = "";
            $nextVideo = "";

            if (currentIndex >= 0 && currentIndex <= queryset.length - 1) {
                if (currentIndex !== 0) {
                    $prevVideo = queryset[currentIndex - 1]['watchId'];
                }
                if (currentIndex !== queryset.length - 1) {
                    $nextVideo = queryset[currentIndex + 1]['watchId'];
                }
            }
            if($nextVideo !== "" && $sidebarQuery !== "" && currentIndex !== queryset.length - 1){
                $nextVideo = $nextVideo + "?q=" + $sidebarQuery;
            }
            if($prevVideo !== "" && $sidebarQuery !== "" && currentIndex !== 0){
                $prevVideo = $prevVideo + "?q=" + $sidebarQuery;
            }
        }
    }
</script>
