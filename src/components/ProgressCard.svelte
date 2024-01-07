<div class="rounded p-1 bg-secondary-subtle border border-secondary border-opacity-25 ms-auto me-2">
  {watched}/{total} <i class="bi bi-check-circle-fill" class:text-success={watched > 0} class:text-secondary={watched === 0}></i>
</div>

<script>
  export let total;
  export let watched;
</script>
