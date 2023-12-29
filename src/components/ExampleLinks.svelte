<div class="video-links text-center">
    <p>Not sure where to start? Here are a few playlist suggestions, try clicking one of these:</p>
    <ul class="list-unstyled">
      {#each links as link}
      <li><a href={link.url} target="#" on:click|preventDefault={() => onClick(link.url)}>{link.name}</a></li>
      {/each}
    </ul>
</div>

<script>
    import { playlistLink, exampleClicked } from '../store.js';
    let links = [
        {
            'name': 'CS50x 2023 Lectures',
            'url': 'https://www.youtube.com/playlist?list=PLhQjrBD2T380F_inVRXMIHCqLaNUd7bN4'
        },
        {
            'name': 'Class 10 Maths Lessons',
            'url': 'https://www.youtube.com/playlist?list=PLph3YM7PV2E5Jc9-marHDoY5ymnDkHCuy'
        }
    ]

    function onClick(url){
        $playlistLink = url;
        $exampleClicked = 1;
    }
</script>
