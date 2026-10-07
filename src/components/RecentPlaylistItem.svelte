<li class="list-group-item d-flex align-items-center" transition:fade={{ duration: 150, easing: cubicOut }}>
    <img src={authorImg} width="36" height="36" class="img-fluid rounded-circle flex-shrink-0" alt={author}>
    <div class="mx-3 position-relative">
        <a href="/lessons/{playlistId}/{videoId}" class="stretched-link link-underline" class:link-success={isSaved} class:link-secondary={!isSaved}>{title}</a>
        <div class="text-body-secondary">@{author}</div>
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
