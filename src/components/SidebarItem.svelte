<li class="nav-item">
    <a class="nav-link {isActive ? 'active' : ''}" on:click={() => {handleClick(index)}} href="#" aria-pressed="true" 
        bind:this={linkElement}>{title}</a>
</li>

<script>
    import { activeChildIndex, sidebarQuery, lessons } from '../store/state.js';

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
        if($sidebarQuery === ''){
            $activeChildIndex = index;
        }
        else{
            let filteredQuery = $lessons.filter(item => item.name.toLowerCase().includes($sidebarQuery.toLowerCase()) > 0);
            let matchedVideoId = filteredQuery[index]['watchId'];
            $activeChildIndex = $lessons.findIndex(item => item['watchId'] === matchedVideoId);
        }
    }
</script>
