<script>
  import { Menu, MenuItem, Popover } from '$lib';

  let menuItems = ['Item 1', 'Item 2', 'Item 3'];
  let currentMenuItem = menuItems[0];

  $: console.log(currentMenuItem);
</script>

<div style="padding: 80px;">
  <Menu>
    <span slot="button">Menu</span>
    {#each menuItems as menuItem (menuItem)}
      <MenuItem
        selected={currentMenuItem === menuItem}
        on:select={() => (currentMenuItem = menuItem)}
      >
        {menuItem}
      </MenuItem>
    {/each}
  </Menu>

  <Popover overlay>
    <span slot="button">Popover</span>
    Content here.
  </Popover>
</div>
