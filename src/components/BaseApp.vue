<!-- Base application vue, to be used for each page ( except connect ) -->
<template>
  <div id="app">
    <ConnectLog/>
    <Watcher/>
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import ConnectLog from '@/components/utils/ConnectLog.vue'
import Watcher from '@/components/utils/Watcher.vue'

export default { name: 'App', components: { ConnectLog, Watcher } }
</script>

<style lang="less">
</style>
