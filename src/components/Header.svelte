<svelte:head>
    <title>{title}</title>
</svelte:head>

<nav class="navbar sticky-top" style="background-color: var(--bs-content-bg); border-bottom: var(--bs-border-width) solid var(--bs-content-border-color);">
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
    import { lessons } from "../store/state.js";
    export var loading = false;
    export var videoId;

    let title = loading === true ? 'Loading...': 'YT Playlist Zen';

    $: {
        if(videoId !== undefined){
            if(Object.keys($lessons).length > 0){
                title = $lessons['videos'].filter(item => item['watchId'] == videoId)[0]['name'];
            }
        }
    }
</script>
