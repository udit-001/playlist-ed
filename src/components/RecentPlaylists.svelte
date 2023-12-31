{#if $recentPlaylists.length > 0}
<div class="row" transition:blur={{ amount: 8 }}>
    <div class="col-sm-8 mx-auto mt-3 mb-5 order-sm-last">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title m-0">Recent Playlists</h5>
                <!-- <div class="position-relative">
                    <label for="search-input" class="position-absolute top-50 start-0 translate-middle-y z-1 text-body-secondary ps-2">
                        <i class="fa-regular fa-search" aria-hidden="true"></i>
                        <span class="visually-hidden">Search</span>
                    </label>
                    <input type="text" name="search" class="form-control" id="search-input" placeholder="Search for people" style="padding-left: 1.75rem;">
                </div> -->
            </div>
            <ul class="list-group list-group-flush">
                {#each $recentPlaylists as p (p.playlistId)}
                    <RecentPlaylistItem title={p.title} author={p.author} authorImg={p.authorImg} playlistId={p.playlistId}/>
                {/each}
            </ul>
            <!-- <div class="card-body">
                <a href="#" class="btn btn-secondary btn-lg fs-6 d-block w-100">
                    View all <i class="fa-light fa-arrow-right ms-1" aria-hidden="true"></i>
                </a>
            </div> -->
        </div>
    </div>
  </div>
{/if}

<script>
    import { blur } from 'svelte/transition';
    import { recentPlaylists } from '../store/playlist.js'
    import RecentPlaylistItem from './RecentPlaylistItem.svelte';
</script>
