<script lang="ts">
  import { getSidebarContext, isActiveSidebarLink, isSubLinkActive } from './contexts';
  import type { SidebarLink } from './contexts';
  import { page } from '$app/stores';

  export let sidebarLink: SidebarLink;

  export let level = 0;

  let isActive = isActiveSidebarLink(sidebarLink, $page.url.pathname);

  let isOpen = level == 0 ? true : isSubLinkActive(sidebarLink, $page.url.pathname) ? true : false;

  let paddingRem = level;

  const icon_size_class: { [key: number]: string } = {
    0: 'w-6 h-6',
    1: 'w-5 h-5',
    2: 'w-4 h-4',
  };

  const icon_size = icon_size_class[level] || icon_size_class[2];
</script>

<div
  class="{level == 0 ? 'text-lg font-semibold  pt-8' : 'text-base font-normal'}
         {level == 1 ? 'border-l border-border' : ''}
        "
>
  <div
    class="flex justify-between items-center {isActive
      ? 'text-brand font-semibold'
      : level != 0
        ? 'text-soft font-normal'
        : ''}
      {level > 0 ? 'border-l border-border -ml-px hover:border-inverse py-1' : 'pb-3'}"
    style={isActive ? 'border-color: var(--kd-sidebar-border-active);' : ''}
    on:click={() => (isOpen = !isOpen)}
    on:keydown={() => {}}
    role="button"
    tabindex={undefined}
  >
    <!-- <div class={level == 0 ? 'text-lg text-strong font-semibold' : 'text-base'}>
      {name}
    </div> -->
    <!-- href={name} -->
    <!--  -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <a style="padding-left: {paddingRem}rem;" href={sidebarLink.slug ?? ''}>
      {sidebarLink.title}
      <!-- {#if link.icon?.before}
      <svelte:component this={link.icon.before} class="mr-1" width="24" height="24" />
    {/if}
 
    {#if link.icon?.after}
      <svelte:component this={link.icon.after} class="ml-1" width="24" height="24" />
    {/if} -->
    </a>
    {#if sidebarLink.sublinks?.length}
      {#if !isOpen}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class={icon_size}
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      {/if}
      {#if isOpen}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class={icon_size}
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      {/if}
    {/if}
  </div>
  {#if isOpen}
    {#each sidebarLink.sublinks ?? [] as sublink}
      <svelte:self sidebarLink={sublink} level={level + 1} />
    {/each}
  {/if}
</div>

<!-- 
 -->
