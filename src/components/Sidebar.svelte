<nav class="sidebar offcanvas-start offcanvas-md" tabindex="-1" id="sidebar-example">
    <div class="offcanvas-header">
        <!-- <a class="sidebar-brand" href="#"> -->
          <a href="/" class="btn float-start">
            <i class="bi bi-chevron-double-left"></i>
          </a>
          <!-- <button class="btn" data-bs-toggle="offcanvas" aria-label="Close" data-bs-target="#sidebar-example"></button> -->
          <!-- <img src="..." alt="Logo" width="24" height="24" class="d-inline-block align-text-top"> -->
          <h5 class="mx-auto align-middle mb-0 fw-normal">
            Contents
          </h5>
        <!-- </a> -->
          <button type="button" class="btn-close d-md-none" data-bs-dismiss="offcanvas" aria-label="Close" data-bs-target="#sidebar-example"></button>
    </div>
      <div class="offcanvas-body">
          <!-- <div class="mt-2 mb-3">
              <input type="text" class="form-control" placeholder="Search">
          </div> -->
          <ul class="sidebar-nav">
              <!-- <li>
                  <h6 class=" sidebar-header text-center">Contents</h6>
              </li> -->
              <!-- <li><hr class="sidebar-divider"></li> -->
              {#if  loading}
                {#each {length: 8} as _, i}
                  <span class="placeholder col-12 placeholder-lg mb-2 placeholder-wave" class:d-none={!loading}></span>
                {/each}
              {:else}
                {#each $lessons as lesson, index}
                  <SidebarItem title={lesson.name} {index} isActive={$activeChildIndex === index} watchId={lesson.watchId}/>
                {/each}
              {/if}
          </ul>
      </div>
  </nav>

<script>
  import { lessons, activeChildIndex } from '../store.js';
  import SidebarItem from './SidebarItem.svelte';
  export let loading;
</script>
