<li class="list-group-item d-flex align-items-center" transition:blur={{ amount: 7 }}>
    <img src={authorImg} width="36" height="36" class="img-fluid rounded-circle flex-shrink-0" class:opacity-100={isSaved} class:opacity-50={!isSaved} alt={author}>
    <div class="mx-3 position-relative">
        <a href="/lessons/{playlistId}" class="stretched-link link-underline link-success link-underline-success" class:link-opacity-100={isSaved} class:link-opacity-50={!isSaved}>{title}</a>
        <div class="text-body-secondary" class:text-opacity-100={isSaved} class:text-opacity-50={!isSaved}>@{author}</div>
    </div>
    <button type="button" class="btn btn-secondary ms-auto" disabled={isSaved} on:click={savePlaylist(playlistId)}>
        {#if isSaved == true}
        <i class="bi bi-bookmark-check-fill"></i>
        {:else}
        <i class="bi bi-bookmark-plus-fill"></i>
        {/if}
    </button>
    <button type="button" class="btn btn-secondary ms-2" on:click={removeRecentPlaylist(playlistId)}>
        <i class="bi bi-trash-fill"></i>
    </button>
</li>

<script>
    import { blur } from 'svelte/transition';
    import { removeRecentPlaylist, savePlaylist, savedPlaylists } from "../store/playlist.js";
    export let title;
    export let author;
    export let authorImg;
    export let playlistId;
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
