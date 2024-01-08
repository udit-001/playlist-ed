<div class="filter-docs sticky-top p-3">
    <div class="input-group">
    <input type="text" class="form-control" placeholder="Search" aria-label="Search" bind:value={$sidebarQuery} aria-labelledby="search-help-block">
    <button type="button" class="btn btn-secondary" aria-label="Close" on:click={clearQuery} aria-expanded="false" class:d-none={$sidebarQuery === ""} class:rounded={$sidebarQuery === ""}>
        <i class="bi bi-x"></i>
    </button>
    <SidebarFilter />
    </div>
    <div id="search-help-block" class="form-text text-center">
        {filteredText}
    </div>
</div>

<script>
    import { sidebarQuery, sidebarFilter } from "../store/state";
    import { navigate } from "astro:transitions/client";
    import SidebarFilter from "./SidebarFilter.svelte";
    var filteredText = "";

    $: {
        if($sidebarFilter === "completed"){
            filteredText = "Filtered by Completed Videos";
        }
        else if($sidebarFilter === "incomplete"){
            filteredText = "Filtered by Incomplete Videos";
        }
        else{
            filteredText = "";
        }
    }

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
