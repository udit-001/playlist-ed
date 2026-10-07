<div class="progress-badge rounded p-1 bg-secondary-subtle border border-secondary border-opacity-25 ms-auto me-2">
  <span aria-hidden="true">{watched}/{total} <i class="bi bi-check-circle-fill" class:text-success={watched > 0} class:text-secondary={watched === 0}></i></span>
  <span class="sr-only">{watched} of {total} videos completed</span>
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

  /* "3/26" reads as "3 slash 26" aloud, so the count carries a spoken form.
     Halfmoon ships no visually-hidden utility. */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
