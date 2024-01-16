<script lang="ts">
  import { getSidebarContext, isActiveSidebarLink } from './contexts';

  export let name: string;

  interface SidebarCategoryProps {
    name: string;
    isActive?: boolean;
    subitems?: SidebarCategoryProps[];
  }

  export let level = 0;

  let isOpen = level == 0 ? true : false;

  export let subitems: SidebarCategoryProps[] = [];

  export let isActive: boolean = false;

  let paddingRem = level;
</script>

<div
  class="{level == 0 ? 'text-lg font-semibold' : 'text-base font-normal'}
         {level == 1 ? 'border-l border-border' : ''}"
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
    <a style="padding-left: {paddingRem}rem;">
      {name}
      <!-- {#if link.icon?.before}
      <svelte:component this={link.icon.before} class="mr-1" width="24" height="24" />
    {/if}
 
    {#if link.icon?.after}
      <svelte:component this={link.icon.after} class="ml-1" width="24" height="24" />
    {/if} -->
    </a>
    {#if level == 0}
      {#if !isOpen}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
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
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      {/if}
    {/if}
  </div>
  {#if isOpen}
    {#each subitems as subitem}
      <svelte:self
        name={subitem.name}
        subitems={subitem.subitems}
        level={level + 1}
        isActive={subitem.isActive}
      />
    {/each}
  {/if}
</div>

<!-- 
 -->
