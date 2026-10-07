<div class="filter-docs sticky-top p-3">
    <div class="input-group">
    <input type="text" class="form-control" placeholder="Search videos" aria-label="Search videos" bind:value={$sidebarQuery} aria-describedby="search-help-block">
    <button type="button" class="btn btn-secondary" aria-label="Clear search" on:click={clearQuery} aria-expanded="false" class:d-none={$sidebarQuery === ""} class:rounded={$sidebarQuery === ""}>
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
            filteredText = "Showing completed videos";
        }
        else if($sidebarFilter === "incomplete"){
            filteredText = "Showing incomplete videos";
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
