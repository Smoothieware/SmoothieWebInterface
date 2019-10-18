<!-- Base application vue, to be used for each page ( except connect ) -->
<template>
  <div id="app">
    <ConnectLog/>
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import ConnectLog from '@/components/utils/ConnectLog.vue'
export default { name: 'App', components: { ConnectLog } }
</script>

<style lang="less">
</style>
