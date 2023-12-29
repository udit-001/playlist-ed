<div class="row mt-3">
    <div class="clearfix">
        <button type="button" class="btn btn-primary btn-lg w-25 float-start" on:click={goPrev} class:d-none={$activeChildIndex === 0}>
            <i class="fa-solid fa-chevron-left"></i> Previous
        </button>
        <button type="button" class="ms-auto btn btn-primary btn-lg w-25 float-end" on:click={goNext} class:d-none={($activeChildIndex === ($lessons.length - 1)) || loading}>
            Next <i class="fa-solid fa-chevron-right"></i>
        </button>
        <span class="placeholder placeholder-lg placeholder-wave bg-primary w-25 float-end p-3" class:d-none={!loading}></span>
    </div>
</div>

<script>
    import { lessons, activeChildIndex } from '../store';
    export let loading;
    function goNext(){
        $activeChildIndex += 1;
    }

    function goPrev(){
        $activeChildIndex -= 1;
    }
</script>
