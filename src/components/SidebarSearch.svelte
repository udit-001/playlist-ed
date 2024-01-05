<div class="filter-docs sticky-top p-3">
    <div class:input-group={$sidebarQuery !== ""}>
    <input type="text" class="form-control" placeholder="Search" aria-label="Search" bind:value={$sidebarQuery}>
    <button type="button" class="btn btn-secondary" aria-label="Close" on:click={clearQuery} aria-expanded="false" class:d-none={$sidebarQuery === ""} class:rounded={$sidebarQuery === ""}>
        <i class="bi bi-x"></i>
    </button>
    </div>
</div>

<script>
    import { sidebarQuery } from "../store/state";
    import { navigate } from "astro:transitions/client";
    function clearQuery(){
        $sidebarQuery = "";
        navigate("?q=");
    }
</script>

<style>
    .filter-docs{
        background-color: var(--bs-sidebar-bg);
    }
</style>
