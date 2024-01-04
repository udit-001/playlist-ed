{#if $invidiousInstances.length > 0}
<Header {loading}/>
<div class="container-fluid mt-3">
    <div class="row">
        <div class="col-lg-12">
            <VideoEmbed {loading}/>
        </div>
      </div>
    <VideoButtons {loading}/>
<Sidebar {loading}/>
</div>
{/if}

<script>
    import { onMount } from 'svelte';
    import { invidiousInstances, fetchInvidiousInstances } from '../store/invidious.js';
    import { fetchPlaylist } from '../store/playlist.js';
    import { lessons } from '../store/state.js';
    import VideoEmbed from './VideoEmbed.svelte';
    import Sidebar from './Sidebar.svelte';
    import VideoButtons from './VideoButtons.svelte';
    import Header from './Header.svelte';
    import { navigate } from 'astro:transitions/client';

    export let id;

    let loading = true;

	onMount(async () => {
        if(id !== undefined){
            try{
                if($invidiousInstances.length == 0){
                    await fetchInvidiousInstances();
                }
                $lessons = await fetchPlaylist(id);
                loading = false;
            }
            catch{
                navigate("/");
            }
        }
    });
</script>
