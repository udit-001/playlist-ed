<nav class="navbar" style="background-color: var(--bs-content-bg); border-bottom: var(--bs-border-width) solid var(--bs-content-border-color);">
    <div class="container-fluid">
    <button class="navbar-toggler d-md-none" type="button" data-bs-toggle="offcanvas" aria-label="Close" data-bs-target="#sidebar-example">
        <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand mx-auto" href="#">
        {title}
    </a>
    </div>
</nav>

<script>
    import { lessons, activeChildIndex } from "../store.js";
    export let title = 'Header';
    let currentIndex;
    $: {
        if($lessons.length !== 0){
            currentIndex = $activeChildIndex;
            title = $lessons[currentIndex].name;
        }
    }
</script>
