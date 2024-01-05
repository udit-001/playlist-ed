<li class="nav-item">
    <a class="nav-link {isActive ? 'active' : ''}" href="./{watchId}" aria-pressed="true" data-astro-history="push"
        bind:this={linkElement}>{title}</a>
</li>

<script>
    import { onMount } from 'svelte';

    export let title;
    export let index;
    export let watchId;
    export let isActive;
    var linkElement;

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
