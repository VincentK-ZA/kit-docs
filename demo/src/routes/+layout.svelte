<script>
  import 'stubber-kit-docs/client/polyfills/index.js';
  import 'stubber-kit-docs/client/styles/normalize.css';
  import 'stubber-kit-docs/client/styles/fonts.css';
  import 'stubber-kit-docs/client/styles/theme.css';
  import 'stubber-kit-docs/client/styles/vars.css';

  import SvelteLogo from '$img/svelte-horizontal.svg?raw';

  import { page } from '$app/stores';

  import {
    createKitDocsLoader,
    KitDocs,
    KitDocsLayout,
    Button,
    SocialLink,
    createSidebarContext,
  } from 'stubber-kit-docs';

  /** @type {import('./$types').PageData */
  export let data;

  let { meta, sidebar } = data;
  $: ({ meta, sidebar } = data);

  /** @type {import('stubber-kit-docs').NavbarConfig} */
  const navbar = {
    links: [
      { title: 'Docs', slug: '/docs', match: /\/docs/ },
      { title: 'Tutorials', slug: 'https://svelte.dev/tutorial' },
      { title: 'Examples', slug: 'https://svelte.dev/examples' },
      { title: 'REPL', slug: 'https://svelte.dev/repl' },
      { title: 'Blog', slug: 'https://svelte.dev/blog' },
      { title: 'FAQ', slug: 'https://svelte.dev/faq' },
    ],
  };

  const { activeCategory } = createSidebarContext(sidebar);

  $: category = $activeCategory ? `${$activeCategory}: ` : '';
  $: title = meta ? `${category}${meta.title} | Svelte` : null;
  $: description = meta?.description;
</script>

<svelte:head>
  {#key $page.url.pathname}
    {#if title}
      <title>{title}</title>
    {/if}
    {#if description}
      <meta name="description" content={description} />
    {/if}
  {/key}
</svelte:head>

<KitDocs {meta}>
  <KitDocsLayout {navbar} {sidebar}>
    <div slot="navbar-left">
      <div class="logo">
        <Button href="/">
          {@html SvelteLogo}
        </Button>
      </div>
    </div>

    <div class="socials" slot="navbar-right-alt">
      <SocialLink type="twitter" href="https://twitter.com/sveltejs" />
      <SocialLink type="discord" href="https://discord.com/invite/yy75DKs" />
      <SocialLink type="gitHub" href="https://github.com/sveltejs/svelte" />
    </div>

    <slot />
  </KitDocsLayout>
</KitDocs>

<style>
  .logo :global(a) {
    color: rgb(var(--kd-color-inverse));
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo :global(svg) {
    height: 36px;
    overflow: hidden;
  }

  .socials {
    display: flex;
    margin-left: -0.25rem;
  }
</style>
