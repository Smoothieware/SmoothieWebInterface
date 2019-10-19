<template>
  <div class="start">
    <div class="container center">
      <h1> Playing <kbd>/{{$route.params.path}}</kbd> </h1>
    </div>
    <div class="container">
      <LogList title="Log" v-bind:items="log.as_array()"></LogList>
    </div>
    <br/>

  </div> <!-- /container -->
</template>

<script>
import LogList from '@/components/utils/LogList.vue'

export default {
  name: 'start',
  components: {
    LogList
  },
  data: () => {
    class Log {}
    return {
      log: new Log(),
   };
  },
  mounted(){
    var that = this;
    machine.communication.on_connected.push( () => {
      // Log
      that.log.add(`Asking board to start execution of /${that.$route.params.path}`, {icon: 'play-circle', color: 'default'});

      // Send the command
      machine.communication.command(["play /" + that.$route.params.path]).then((data) => {
        if(data.match(/error/g)){
          that.log.add(`Error occured why trying to start file ( /${that.$route.params.path} ) execution: <kbd>${data}</kbd>`, {icon: 'times', color: 'error'});
        }else{
          that.log.add(`Started playing file ( /${that.$route.params.path} ): <kbd>${data}</kbd>`, {icon: 'thumbs-up', color: 'success'});

          // Go to monitor page
          that.log.add(`Moving to the monitor page`, {icon: 'arrow-right', color: 'default'});
          window.location.replace("/monitor.html#/monitor/");
        }
      }).catch((why) => {
        that.log.add(`Error occured why trying to start file ( /${that.$route.params.path} ) execution: <kbd>${why}</kbd>`, {icon: 'times', color: 'error'});
      });
    });
  },

}
</script>

<style lang="less">
  .center {
    text-align: center;
  }
</style>
