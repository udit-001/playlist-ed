<li class="nav-item">
    <a class="nav-link {isActive ? 'active' : ''}" href={href} aria-pressed="true" data-astro-history="push"
        bind:this={linkElement}>{title}</a>
</li>

<script>
    import { onMount } from 'svelte';
    import { sidebarQuery } from '../store/state';
    export let title;
    export let index;
    export let watchId;
    export let isActive;
    var linkElement;
    var href;

    $: href = $sidebarQuery !== "" ? "./" + watchId + "?q=" + $sidebarQuery : "./" + watchId;

    onMount(() => {
        if(linkElement !== undefined){
                if(isActive){
                    linkElement.parentElement.scrollIntoView({
                        block: 'center',
                        inline: "nearest",
                    });
                }
        }
    });
</script>
