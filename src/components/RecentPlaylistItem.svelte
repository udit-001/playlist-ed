<li class="list-group-item d-flex align-items-center" transition:fade={{ duration: 150, easing: cubicOut }}>
    <img src={authorImg} width="36" height="36" class="img-fluid rounded-circle flex-shrink-0" class:opacity-100={isSaved} class:opacity-50={!isSaved} alt={author}>
    <div class="mx-3 position-relative">
        <a href="/lessons/{playlistId}/{videoId}" class="stretched-link link-underline link-success link-underline-success" class:link-opacity-100={isSaved} class:link-opacity-50={!isSaved}>{title}</a>
        <div class="text-body-secondary" class:text-opacity-100={isSaved} class:text-opacity-50={!isSaved}>@{author}</div>
    </div>
    <ProgressCard total={videoCount} watched={viewedCount} />
    <button type="button" class="btn btn-secondary" aria-label="Save playlist" disabled={isSaved} on:click={savePlaylist(playlistId)}>
        {#if isSaved == true}
        <i class="bi bi-bookmark-check-fill"></i>
        {:else}
        <i class="bi bi-bookmark-plus-fill"></i>
        {/if}
    </button>
    <button type="button" class="btn btn-secondary ms-2" aria-label="Remove from recent" on:click={removeRecentPlaylist(playlistId)}>
        <i class="bi bi-trash-fill"></i>
    </button>
</li>

<script>
    import { fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { removeRecentPlaylist, savePlaylist, savedPlaylists } from "../store/playlist.js";
    import ProgressCard from './ProgressCard.svelte';
    export let title;
    export let author;
    export let authorImg;
    export let playlistId;
    export let videoId;
    export let videoCount;
    export let viewedCount;
    let isSaved;
    $: isSaved = $savedPlaylists.filter(item => item['playlistId'] === playlistId).length > 0;
</script>

<style>
    :global(.link-success) {
        color: hsla(var(--bs-success-text-emphasis-hsl), var(--bs-link-opacity, 1))
    }

    :global(.link-underline-success){
        text-decoration-color: hsla(var(--bs-success-hsl),var(--bs-link-underline-opacity)) !important;
    }

    :global(.link-opacity-50) {
    opacity: 0.5;
    }

    .text-opacity-50{
        --bs-text-opacity: 0.50;
    }

    .text-body-secondary{
        color: hsla(var(--bs-secondary-color-hsl), var(--bs-text-opacity, 1)) !important;
    }
</style>
