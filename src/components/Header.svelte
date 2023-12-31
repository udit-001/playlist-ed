<svelte:head>
    <title>{title}</title>
</svelte:head>
<nav class="navbar" style="background-color: var(--bs-content-bg); border-bottom: var(--bs-border-width) solid var(--bs-content-border-color);">
    <div class="container-fluid">
    <button class="navbar-toggler d-md-none" type="button" data-bs-toggle="offcanvas" aria-label="Close" data-bs-target="#sidebar-example">
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
    export let loading = false;
    let title = loading === true ? 'Loading...': 'YT Playlist Zen';
    let currentIndex;
    $: {
        if($lessons.length !== 0){
            currentIndex = $activeChildIndex;
            title = $lessons[currentIndex].name;
        }
    }
</script>
