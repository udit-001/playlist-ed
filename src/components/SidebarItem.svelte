<li class="nav-item">
    <a class="nav-link" class:active={isActive} class:icon-link={completed} class:link-success={completed && !isActive} class:link-opacity-50={completed && !isActive} {href} aria-pressed="true" data-astro-history="push"
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


<style>
    .link-success {
        color: hsla(var(--bs-success-text-emphasis-hsl), var(--bs-link-opacity, 1)) !important;
    }

    .link-success:hover {
        color: hsla(var(--bs-success-text-emphasis-hsl), var(--bs-link-opacity, 1));
    }

    .link-underline-success{
        text-decoration-color: hsla(var(--bs-success-hsl),var(--bs-link-underline-opacity)) !important;
    }

    .link-opacity-50 {
        --bs-link-opacity: 0.5;
    }

    .link-opacity-50:hover {
        --bs-link-opacity: 0.3;
    }
</style>
