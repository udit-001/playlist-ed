<li class="list-group-item d-flex align-items-center" transition:blur={{ amount: 7 }}>
    <img src={authorImg} width="36" height="36" class="img-fluid rounded-circle flex-shrink-0" alt={author}>
    <div class="mx-3 position-relative">
        <a href="/lessons/{playlistId}/{videoId}" class="stretched-link link-underline link-success link-underline-opacity-25">{title}</a>
        <div class="text-body-secondary">@{author}</div>
    </div>
    <ProgressCard total={videoCount} watched={viewedCount}/>
    <button type="button" class="btn btn-secondary" on:click={unsavePlaylist(playlistId)}>
        <i class="bi bi-bookmark-dash-fill"></i>
    </button>
</li>

<script>
    import { blur } from 'svelte/transition';
    import { unsavePlaylist } from "../store/playlist.js";
    import ProgressCard from './ProgressCard.svelte';
    export let title;
    export let author;
    export let authorImg;
    export let playlistId;
    export let videoId;
    export let videoCount;
    export let viewedCount;
</script>
