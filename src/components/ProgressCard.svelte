<div class="progress-badge rounded p-1 bg-secondary-subtle border border-secondary border-opacity-25 ms-auto me-2">
  {watched}/{total} <i class="bi bi-check-circle-fill" class:text-success={watched > 0} class:text-secondary={watched === 0}></i>
</div>

<script>
  export let total;
  export let watched;
</script>

<style>
  /* The row can now shrink its text column, which would otherwise squeeze this
     badge until "3/26" wrapped onto two lines. */
  .progress-badge {
    flex-shrink: 0;
    white-space: nowrap;
  }
</style>
