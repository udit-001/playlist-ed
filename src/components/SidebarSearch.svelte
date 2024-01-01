<div class="filter-docs sticky-top p-3">
    <input type="text" class="form-control" placeholder="Search" bind:value={$sidebarQuery}>
</div>

<script>
    import { sidebarQuery } from "../store/state";
</script>

<style>
    .filter-docs{
        background-color: var(--bs-sidebar-bg);
    }
</style>
