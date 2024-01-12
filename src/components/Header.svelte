<svelte:head>
    <title>{title}</title>
</svelte:head>

<nav class="navbar sticky-top" class:py-0={logo === true} style="background-color: var(--bs-content-bg); border-bottom: var(--bs-border-width) solid var(--bs-content-border-color);">
    <div class="container-fluid">
    <button class:d-none={videoId === undefined} class="navbar-toggler d-md-none" type="button" data-bs-toggle="offcanvas" aria-label="Close" data-bs-target="#sidebar-example">
        <span class="navbar-toggler-icon"></span>
    </button>
    <span class="navbar-brand mx-auto w-75 text-center text-truncate" href="#" class:d-none={loading}>
        {#if logo}
            <HeaderLogo />
        {/if}
        <span class="align-middle">
            {title}
        </span>
    </span>
    <span class="placeholder col-5 mx-auto m-2 placeholder-lg placeholder-wave" class:d-none={!loading}></span>
    </div>
</nav>

<script>
    import { lessons } from "../store/state.js";
    import HeaderLogo from "./HeaderLogo.svelte";
    export var loading = false;
    export var videoId;
    export var logo = false;

    let title = loading === true ? 'Loading...': 'Playlist-Ed';

    $: {
        if(videoId !== undefined){
            if(Object.keys($lessons).length > 0){
                title = $lessons['videos'].filter(item => item['watchId'] == videoId)[0]['name'];
            }
        }
    }
</script>
