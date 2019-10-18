<template>
  <div class="watcher">
  </div> <!-- /container -->
</template>

<script>

export default {
  name: 'watcher',
  components: {
  },
  mounted(){
    var that = this;
    // When we are connected
    machine.communication.on_connected.push( () => {
      // Start watching
      machine.watchdog.start_watching();
    });
  },

}
</script>

<style lang="less">
  .center {
    text-align: center;
  }
</style>
