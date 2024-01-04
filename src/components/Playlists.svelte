<div class="row" transition:blur={{ amount: 8 }}>
    <div class="col-md-8 col-11 mx-auto mt-3 mb-5 order-sm-last">
        <div class="card">
            <div class="card-header">
                <ul class="nav nav-pills nav-justified mx-3 px-3 mx-md-4 px-md-4 mx-lg-5 px-lg-5 px-sm-4 mx-sm-4 card-header-pills" id="js-tabs-1" role="tablist">
                    <li class="nav-item d-flex align-items-center" role="presentation">
                      <button class="nav-link active" id="recent-tab" data-bs-toggle="tab" data-bs-target="#recent-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                        <i class="bi bi-clock-history me-2"></i> Recent</button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="saved-tab" data-bs-toggle="tab" data-bs-target="#saved-tab-pane" type="button" role="tab" aria-controls="account-tab-pane" aria-selected="false">
                        <i class="bi bi-bookmark-fill me-2"></i>Saved</button>
                    </li>
                </ul>
            </div>
            <div class="card-body p-0">
                <div class="col-sm-12 mx-auto">
                    <div class="tab-content" id="js-tabs-content-1">
                      <RecentPlaylists />
                      <SavedPlaylists />
                    </div>
              </div>
            </div>
                <!-- <h5 class="card-title m-0">Recent Playlists</h5> -->
                <!-- <div class="position-relative">
                    <label for="search-input" class="position-absolute top-50 start-0 translate-middle-y z-1 text-body-secondary ps-2">
                        <i class="bi bi-search" aria-hidden="true"></i>
                        <span class="visually-hidden">Search</span>
                    </label>
                    <input type="text" name="search" class="form-control" id="search-input" placeholder="Search for people" style="padding-left: 1.75rem;">
                </div> -->
            <!-- <div class="card-body">
                <a href="#" class="btn btn-secondary btn-lg fs-6 d-block w-100">
                    View all <i class="bi bi-arrow-right"></i>
                </a>
            </div> -->
        </div>
    </div>
</div>

<script>
    import { blur } from 'svelte/transition';
    import { recentPlaylists, savedPlaylists } from '../store/playlist.js'
    import SavedPlaylists from './SavedPlaylists.svelte';
    import RecentPlaylists from './RecentPlaylists.svelte';
</script>
