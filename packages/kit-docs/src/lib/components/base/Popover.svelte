<script context="module">
  let idCount = 0;
</script>

<script lang="ts">
  import clsx from 'clsx';
  import { createEventDispatcher } from 'svelte';
  import CloseIcon from '~icons/ri/close-fill';

  import { dialogManager, type CloseDialogCallback } from '$lib/actions/dialog-manager';
  import { isLargeScreen } from '$lib/stores/screen';
  import { ariaBool } from '$lib/utils/aria';
  import { wasEnterKeyPressed } from '$lib/utils/keyboard';
  import { hideDocumentScrollbar } from '$lib/utils/scroll';

  import Overlay from './Overlay.svelte';

  export let open = false;
  export let overlay = false;

  const dispatch = createEventDispatcher();

  let popoverId = `popover-${(idCount += 1)}`;
  let popoverButtonId = `popover-button-${idCount}`;

  let closeDialog: CloseDialogCallback;

  function onOpenPopover() {
    open = true;
    hideDocumentScrollbar(true);
    dispatch('open');
  }

  function onClosePopover() {
    open = false;
    hideDocumentScrollbar(false);
    dispatch('close');
  }

  $: if ($isLargeScreen) {
    closeDialog?.();
    hideDocumentScrollbar(false);
  }

  $: classes = open
    ? 'opacity-100 scale-100 pointer-events-auto'
    : 'opacity-0 scale-95 pointer-events-none';
</script>

<div class="not-prose relative inline-block text-left">
  <button
    id={popoverButtonId}
    type="button"
    class={clsx(
      'inline-flex w-full justify-center rounded-md p-2 text-lg font-medium',
      'transform-gpu transition-transform hover:scale-[1.025]',
      open ? 'text-inverse' : 'text-soft hover:text-inverse',
    )}
    aria-controls={popoverId}
    aria-expanded={ariaBool(open)}
    aria-haspopup="true"
    use:dialogManager={{
      onOpen: onOpenPopover,
      onClose: onClosePopover,
      close: (cb) => {
        closeDialog = cb;
      },
    }}
  >
    <slot name="button" />
  </button>

  {#if overlay}
    <Overlay {open} />
  {/if}

  <div
    id={popoverId}
    class={clsx(
      'absolute -top-4 -left-1/2 z-50 min-w-[340px] origin-top-right p-5 pt-4 duration-100 ease-in-out',
      classes,
    )}
    tabindex="-1"
    role="dialog"
  >
    <div
      class="bg-elevate border-border flex min-h-[60px] flex-col overflow-hidden rounded-md border-[1.5px]"
    >
      <div class="z-20 flex items-center">
        <div class="flex-1" />
        <button
          class={clsx(
            'text-soft hover:text-inverse mt-[0.125rem] mr-[0.125rem] p-4',
            !open && 'pointer-events-none',
          )}
          on:pointerup={() => closeDialog()}
          on:keydown={(e) => wasEnterKeyPressed(e) && closeDialog(true)}
        >
          <CloseIcon width="28" height="28" />
          <span class="sr-only">Close</span>
        </button>
      </div>

      <div class="-mt-[2.5rem] px-4 pt-8 pb-6">
        <slot />
      </div>
    </div>
  </div>
</div>
