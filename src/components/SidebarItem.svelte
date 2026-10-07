<li class="nav-item">
    <a class="nav-link" class:active={isActive} class:icon-link={completed} class:link-success={completed && !isActive} {href} aria-current={isActive ? 'page' : undefined} data-astro-history="push"
        bind:this={linkElement}>
        {#if completed}<i class="bi bi-check-circle-fill"></i>{/if}{title}</a>
</li>

<script>
    import { completedVideos } from '../store/state';
    import { onMount } from 'svelte';
    import { sidebarQuery } from '../store/state';
    export let title;
    export let index;
    export let watchId;
    export let isActive;
    export let completed = false;
    var linkElement, href;

    $: href = $sidebarQuery !== "" ? "./" + watchId + "?q=" + $sidebarQuery : "./" + watchId;

    $: completed = $completedVideos.includes(watchId);

    onMount(() => {
        completed = $completedVideos.includes(watchId);
        if(linkElement !== undefined){
                if(isActive){
                    linkElement.parentElement.scrollIntoView({
                        block: 'center',
                        inline: "nearest",
                    });
                }
        }
    });
</script>
