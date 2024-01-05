<svelte:head>
    <title>{title}</title>
</svelte:head>

<nav class="navbar" style="background-color: var(--bs-content-bg); border-bottom: var(--bs-border-width) solid var(--bs-content-border-color);">
    <div class="container-fluid">
    <button class:d-none={videoId === undefined} class="navbar-toggler d-md-none" type="button" data-bs-toggle="offcanvas" aria-label="Close" data-bs-target="#sidebar-example">
        <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand mx-auto w-75 text-center text-truncate" href="#" class:d-none={loading}>
        {title}
    </a>
    <span class="placeholder col-5 mx-auto m-2 placeholder-lg placeholder-wave" class:d-none={!loading}></span>
    </div>
</nav>

<script>
    import { lessons, activeChildIndex } from "../store/state.js";
    export var loading = false;
    export var videoId;

    let title = loading === true ? 'Loading...': 'YT Playlist Zen';
    let currentIndex;

    $: {
        if(videoId !== undefined){
            if(Array.isArray($lessons) && $lessons.length !== 0){
                currentIndex = $activeChildIndex;
                title = $lessons.filter(item => item['watchId'] == videoId)[0]['name'];
            }
        }
    }
</script>
