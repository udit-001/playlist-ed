<div class="tab-pane fade show active" id="recent-tab-pane" role="tabpanel" aria-labelledby="recent-tab" tabindex="0">
    {#if $recentPlaylists.length > 0}
    <ul class="list-group list-group-flush">
        {#each $recentPlaylists as p (p.playlistId)}
            <RecentPlaylistItem title={p.title} author={p.author} authorImg={p.authorImg} playlistId={p.playlistId} videoId={p.recentVideo}/>
        {/each}
    </ul>
    {:else }
    <div class="col-12 p-4 text-center">
        <p class="mx-auto text-body-secondary">
            Nothing here yet! 🌟 Start watching your favorite playlists to see them pop up!<br/>
        Just a heads up, recently viewed playlists make way for new discoveries after a while. 📺✨
            <ExampleLinks />
        </p>
     </div>
    {/if}
</div>


<script>
    import { recentPlaylists } from '../store/playlist.js'
    import RecentPlaylistItem from './RecentPlaylistItem.svelte';
    import ExampleLinks from './ExampleLinks.svelte';
</script>
