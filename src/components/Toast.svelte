<div class="toast fade position-fixed bottom-0 end-0 m-3 text-bg-danger" role="alert" aria-live="assertive" aria-atomic="true" class:show={$toastMessage !== ''}>
  <div class="d-flex align-items-center">
    <div class="toast-body">
      {$toastMessage}
    </div>
    <button type="button" class="btn-close me-2" aria-label="Dismiss" on:click={() => $toastMessage = ''}></button>
  </div>
</div>

<script>
    import { toastMessage } from "../store/state.js";
    let timer;

    $: {
      if($toastMessage !== ''){
        // Clear the previous timer, or an older message's timeout cuts a newer one short.
        clearTimeout(timer);
        timer = setTimeout(function() { $toastMessage = ""}, 5000);
      }
    }
</script>
