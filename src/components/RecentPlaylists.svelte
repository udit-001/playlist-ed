{#if $recentPlaylists.length > 0}
<div class="row">
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
                {#each $recentPlaylists as p}
                    <li class="list-group-item d-flex align-items-center">
                        <img src={p.authorImg} width="36" height="36" class="img-fluid rounded-circle flex-shrink-0" alt="Avatar 3">
                        <div class="mx-3">
                            <a href="/lessons/{p.playlistId}" class="stretched-link link-underline link-success link-underline-opacity-25">{p.title}</a>
                            <div class="text-body-secondary">@{p.author}</div>
                        </div>
                        <!-- <a href="#" class="btn btn-secondary ms-auto">Remove</a> -->
                        <!-- <button type="button" class="btn btn-secondary">Remove</button> -->
                    </li>
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
    import { recentPlaylists } from '../store.js'
</script>
