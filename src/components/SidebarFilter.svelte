<button type="button" class="btn btn-secondary rounded-end dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
    {#if $sidebarFilter !== ""}<i class="bi bi-funnel-fill"></i>{:else}<i class="bi bi-funnel"></i>{/if}
</button>
<ul class="dropdown-menu">
    <li><h6 class="dropdown-header">Filter</h6></li>
    {#each filterOptions as {label, value}, id}
    <li class="mx-1">
        <input type="radio" name="videos-filter" class="btn-check" disabled={value === "completed" && $completedVideos.length === 0} bind:group={$sidebarFilter} id="videos-filter-{id}" value={value} autocomplete="off">
        <label class="btn w-100 text-start" for="videos-filter-{id}">{label}</label>
    </li>
    {/each}
</ul>


<script>
    import { sidebarFilter, completedVideos } from '../store/state';
    var filterOptions = [
        {label: "All Videos", value: ""},
        {label: "Incomplete Videos", value: "incomplete"},
        {label: "Completed Videos", value: "completed"}
    ]
</script>
