<div class="row mt-3">
    <div class="clearfix">
        <a href="./{$prevVideo}" type="button" class="btn btn-primary btn-lg w-sm-25 float-start" class:d-none={$prevVideo === ""}>
            <i class="fa-solid fa-chevron-left"></i> Previous
        </a>
        <a href="./{$nextVideo}" type="button" class="ms-auto btn btn-primary btn-lg w-25 float-end" class:d-none={$nextVideo === ""}>
            Next <i class="fa-solid fa-chevron-right"></i>
        </a>
        <span class="placeholder placeholder-lg placeholder-wave bg-primary w-25 float-end p-3" class:d-none={!loading}></span>
    </div>
</div>

<script>
    import { onMount } from 'svelte';
    import { lessons, sidebarQuery, prevVideo, nextVideo } from '../store/state.js';
    export let loading;
    export let videoId;
    var currentIndex;

    onMount(() => {
        const querySet = () => {
                if ($sidebarQuery === "") {
                return $lessons['videos'];
                } else {
                    return $lessons['videos'].filter(item => item.name.toLowerCase().includes($sidebarQuery.toLowerCase()));
                }
            };

            currentIndex = querySet().findIndex(item => item['watchId'] == videoId);
            $prevVideo = "";
            $nextVideo = "";

            if (currentIndex >= 0 && currentIndex <= querySet().length - 1) {
                if (currentIndex !== 0) {
                    $prevVideo = querySet()[currentIndex - 1]['watchId'];
                    if($sidebarQuery !== ""){
                        $prevVideo = $prevVideo + "?q=" + $sidebarQuery;
                    }
                }
                if (currentIndex !== querySet().length - 1) {
                    $nextVideo = querySet()[currentIndex + 1]['watchId'];
                    if($sidebarQuery !== ""){
                        $nextVideo = $nextVideo + "?q=" + $sidebarQuery;
                    }
                }
            }
    })
</script>
