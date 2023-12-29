<script>
    import { playlistLink, useInvidious, exampleClicked } from "../store.js";
    let url = "";
    let isInvalid = true;
    let disabled = true;

    function isValidYoutubePlaylistURL(url) {
        if (url) {
            const youtubePlaylistRegex =
                /^(https?:\/\/)?(www\.)?youtube\.com\/playlist\?list=[a-zA-Z0-9_-]+(&[a-zA-Z0-9_=-]+)?$/;
            return youtubePlaylistRegex.test(url);
        }
        return true;
    }

    $: {
        url = $playlistLink;
        isInvalid = !isValidYoutubePlaylistURL(url);
        disabled = url === ''? true: isInvalid;
        $useInvidious = $useInvidious ? 1: 0;
    }

    function handleSubmit(){
        location.replace("lessons")
    }
</script>

<form class="row g-3 m-5 w-md-50 mx-auto needs-validation" method="POST" autocomplete="off" novalidate on:submit|preventDefault={handleSubmit}>
    <div class="input-group ps-0">
        <span class="input-group-text"><i class="bi bi-link-45deg"></i></span>
        <div class="form-floating" class:is-invalid={isInvalid}>
            <input
                type="url"
                class="form-control"
                id="playlisturl"
                placeholder=""
                class:is-invalid={isInvalid}
                required
                bind:value={$playlistLink}
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
        />
        <label class="form-check-label" for="invidious">
            Use Invidious Embeds
        </label>
    </div>
    <div class="col-12 text-center">
        <button class="btn btn-primary btn-lg ps-4 pe-4 py-1" class:disabled={disabled} class:move={$exampleClicked} type="submit"
            >Go</button
        >
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