<li class="nav-item">
    <a class="nav-link {isActive ? 'active' : ''}" on:click={() => {handleClick(index)}} href="#" aria-pressed="true" 
        bind:this={linkElement}>{title}</a>
</li>

<script>
    import { activeChildIndex } from '../store/state.js';

    export let title;
    export let index;
    export let watchId;
    export let isActive  = false;
    let linkElement;

    $: {
        if(linkElement !== undefined){
            if($activeChildIndex === index){
                linkElement.scrollIntoView({
                    block: 'center',
                    behavior: 'smooth'
                });
            }
        }
    }

    function handleClick(index) {
        $activeChildIndex = index;
    }
</script>
