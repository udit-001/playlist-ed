<div class="video-links text-center mt-2">
    <p>For inspiration, here are a few playlists you might enjoy:</p>
    <ul class="list-unstyled mt-1">
      {#each links as link}
      <li><a href={link.url} target="#" on:click|preventDefault={() => onClick(link.url)}>{link.name}</a></li>
      {/each}
    </ul>
</div>

<script>
    import { playlistLink, exampleClicked } from '../store/state.js';
    let links = [
        {
            'name': 'CS50x 2023 Lectures',
            'url': 'https://www.youtube.com/playlist?list=PLhQjrBD2T380F_inVRXMIHCqLaNUd7bN4'
        },
        {
            'name': 'CMU Intro to Databases',
            'url': 'https://www.youtube.com/playlist?list=PLSE8ODhjZXjbj8BMuIrRcacnQh20hmY9g'
        }
    ]

    function onClick(url){
        $playlistLink = url;
        $exampleClicked = 1;
    }
</script>
