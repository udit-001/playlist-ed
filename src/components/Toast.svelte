<div class="toast fade position-fixed bottom-0 end-0 m-3 text-bg-danger" role="alert" aria-live="assertive" aria-atomic="true" class:show={$toastMessage !== ''}>
  <div class="d-flex">
    <div class="toast-body">
      {$toastMessage}
    </div>
  </div>
</div>

<script>
    import { toastMessage } from "../store/state.js";
    $: {
      if($toastMessage !== ''){
        setTimeout(function() { $toastMessage = ""}, 5000);
      }
    }
</script>
