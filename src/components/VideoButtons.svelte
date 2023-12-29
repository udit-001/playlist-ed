<div class="row mt-3">
    <div class="clearfix">
        <button type="button" class="btn btn-primary btn-lg w-25 float-start" on:click={goPrev} class:d-none={$activeChildIndex === 0}>
            <i class="fa-solid fa-chevron-left"></i> Previous
        </button>
        <button type="button" class="ms-auto btn btn-primary btn-lg w-25 float-end" on:click={goNext} class:d-none={$activeChildIndex === ($lessons.length - 1)}>
            Next <i class="fa-solid fa-chevron-right"></i>
        </button>
    </div>
</div>

<script>
    import { lessons, activeChildIndex } from '../store';
    function goNext(){
        $activeChildIndex += 1;
    }

    function goPrev(){
        $activeChildIndex -= 1;
    }
</script>
