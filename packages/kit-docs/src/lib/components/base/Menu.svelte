<script context="module">
  let idCount = 0;
</script>

<script lang="ts">
  import clsx from 'clsx';

  import { dialogManager } from '$lib/actions/dialog-manager';
  import { ariaBool } from '$lib/utils/aria';

  export let open = false;

  let menuId = `menu-${(idCount += 1)}`;
  let menuButtonId = `menu-button-${idCount}`;

  function onOpenMenu() {
    open = true;
  }

  function onCloseMenu() {
    open = false;
  }

  $: classes = open
    ? 'opacity-100 scale-100 pointer-events-auto'
    : 'opacity-0 scale-95 pointer-events-none';
</script>

<div class="not-prose relative inline-block text-left">
  <button
    id={menuButtonId}
    type="button"
    class={clsx(
      'inline-flex w-full transform-gpu justify-center rounded-md p-2 text-lg font-medium transition-transform hover:scale-[1.1]',
    )}
    aria-controls={menuId}
    aria-expanded={ariaBool(open)}
    aria-haspopup="true"
    use:dialogManager={{
      onOpen: onOpenMenu,
      onClose: onCloseMenu,
      openOnPointerEnter: false,
      closeOnPointerLeave: false,
      focusSelectors: ['div > li[role="menuitem"]'],
    }}
  >
    <slot name="button" />
  </button>

  <div
    class="transition transform duration-100 ease-in-out origin-top-left
         absolute left-0 {classes}"
  >
    <ul
      id={menuId}
      class="bg-elevate border-border absolute left-0 z-50 mt-2 w-40 origin-top-right rounded-md border-[1.5px]"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={menuButtonId}
      tabindex="-1"
    >
      <div class="py-1" role="none">
        <slot />
      </div>
    </ul>
  </div>
</div>
