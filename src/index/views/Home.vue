<template>
  <div class="container home">
    <!-- Large menu display -->
    <BigMenu v-bind:structure="structure"></BigMenu>
  </div> <!-- /container -->
</template>

<script>
// @ is an alias to /src
import BigMenu from '@/components/utils/BigMenu.vue'

export default {
  name: 'home',
  data: () => {
    return {
      structure: global_menu_structure,  // This is found in menu-structure.js
   };
  },
  components: {
    BigMenu
  }
}

</script>

<style lang="less">
.home{
  text-align: center;
}
</style>
