<div class="tab-pane fade" id="saved-tab-pane" role="tabpanel" aria-labelledby="saved-tab" tabindex="0">
    {#if $savedPlaylists.length > 0}
        <ul class="list-group list-group-flush">
            {#each $savedPlaylists as p (p.playlistId)}
                <SavedPlaylistItem title={p.title} author={p.author} authorImg={p.authorImg} playlistId={p.playlistId}/>
            {/each}
        </ul>
    {:else }
        <div class="col-12 p-4 text-center">
            <p class="mx-auto text-body-secondary">
                Haven't saved any yet? It's where your favorites stay, even after 'Recently Viewed' changes. <br/>
                Let's start saving together! 🤗
            </p>
        </div>
    {/if}
</div>

<script>
    import { savedPlaylists } from '../store/playlist';
    import SavedPlaylistItem from './SavedPlaylistItem.svelte';
</script>
