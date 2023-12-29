<li class="nav-item">
    <a class="nav-link {isActive ? 'active' : ''}" on:click={() => {handleClick(index)}} href="#" aria-pressed="true">{title}</a>
</li>

<script>
    import { activeChildIndex } from '../store.js';

    export let title;
    export let index;
    export let watchId;
    export let isActive  = false;

    function handleClick(index) {
        $activeChildIndex = index;
    }
</script>
