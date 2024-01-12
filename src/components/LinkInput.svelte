<script>
    import { useInvidious } from "../store/userPreferences.js"
    import { invidiousInstances, fetchInvidiousInstances } from "../store/invidious.js"
    import { fetchPlaylist } from "../store/playlist.js";
    import { playlistLink, exampleClicked, lessons, toastMessage } from "../store/state.js";
    import { navigate } from 'astro:transitions/client';
    import { prefetch } from 'astro:prefetch';

    let url = "";
    let isValid = true;
    let disabled = true;
    let loadingButton = false;

    function isValidYoutubePlaylistURL(url) {
        if (url) {
            const youtubePlaylistRegex =
                /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/(?:watch\?v=[a-zA-Z0-9_-]+&)?|youtube\.com\/playlist\/?)\??list=[a-zA-Z0-9_-]+(?:&[a-zA-Z0-9_=-]+)?$/;
            return youtubePlaylistRegex.test(url);
        }
        return true;
    }

    function extractPlaylistId(url){
        const urlParams = new URLSearchParams(new URL(url).search);
        return urlParams.get('list');
    }

    $: {
        url = $playlistLink;
        isValid = isValidYoutubePlaylistURL(url);
        disabled = url === ''? true: !isValid;
        if($invidiousInstances.length == 0){
            fetchInvidiousInstances();
        }
    }

    async function handleSubmit(){
        if(isValid){
            var playlistId = extractPlaylistId(url);
            disabled = true;
            loadingButton = true;
            var data = await fetchPlaylist(playlistId);
            if(data !== null){
                $lessons = data;

                var videoId = data['videos'][0]['watchId'];
                prefetch("lessons/" + playlistId + "/" +  videoId, { with: 'fetch' });
                navigate("lessons/" + playlistId + "/" +  videoId);
                loadingButton = false;
                disabled = false;
            }
            else{
                $toastMessage = "An error ocurred while fetching data :(";
                loadingButton = false;
                disabled = false;
            }
        }
        else{
            return false;
        }
    }
</script>

<form class="row g-3 m-5 w-md-50 mx-auto needs-validation" method="POST" autocomplete="off" novalidate on:submit|preventDefault={handleSubmit}>
    <div class="input-group ps-0">
        <span class="input-group-text"><i class="bi bi-link-45deg"></i></span>
        <div class="form-floating" class:is-invalid={!isValid}>
            <input
                type="url"
                class="form-control"
                id="playlisturl"
                placeholder=""
                class:is-invalid={!isValid}
                required
                bind:value={$playlistLink}
                disabled={loadingButton}
            />
            <label for="example-input-7">YouTube Playlist URL</label>
        </div>
        <div class="invalid-feedback">Please enter a valid playlist URL.</div>
    </div>
    <div class="form-check">
        <input
            class="form-check-input"
            type="checkbox"
            name="invidious"
            id="invidious"
            bind:checked={$useInvidious}
            disabled={loadingButton}
        />
        <label class="form-check-label" for="invidious">
            Use Invidious Embeds
        </label>
    </div>
    <div class="col-12 text-center">
        <button class="btn btn-primary btn-lg ps-4 pe-4 py-1" class:disabled={disabled} class:move={$exampleClicked} type="submit">
            {#if loadingButton }
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...
            {:else }
                Go
            {/if}
        </button>
    </div>
</form>

<style>
    @keyframes shake {
        0% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(-10px);
        }
        50% {
            transform: translateX(10px);
        }
        75% {
            transform: translateX(-10px);
        }
        100% {
            transform: translateX(0);
        }
    }

    .move {
        animation-name: shake;
        animation-duration: 600ms;
        animation-iteration-count: 3;
    }
</style>
