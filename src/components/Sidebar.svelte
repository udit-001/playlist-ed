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
      <div class="offcanvas-body position-relative pt-0">
          <SidebarSearch />
          <ul class="sidebar-nav list">
              <!-- <li>
                  <h6 class=" sidebar-header text-center">Contents</h6>
              </li> -->
              <!-- <li><hr class="sidebar-divider"></li> -->
              {#if  loading}
                {#each {length: 8} as _, i}
                  <span class="placeholder col-12 placeholder-lg mb-2 placeholder-wave" class:d-none={!loading}></span>
                {/each}
              {:else}
                {#each queryset as lesson, index}
                  <SidebarItem title={lesson.name} {index} isActive={$activeChildIndex === index} watchId={lesson.watchId}/>
                {/each}
              {/if}
          </ul>
      </div>
  </nav>

<script>
  import { lessons, activeChildIndex, sidebarQuery } from '../store/state.js';
  import SidebarItem from './SidebarItem.svelte';
  import SidebarSearch from './SidebarSearch.svelte';
  export let loading;
  let queryset = '';
  $: queryset = $sidebarQuery !== '' ? $lessons.filter(item => item.name.toLowerCase().includes($sidebarQuery.toLowerCase()) > 0) : $lessons;
</script>
