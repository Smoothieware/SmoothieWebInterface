<template>
  <div class="connectlog">

    <!-- Modal ( conditionally displayed ) -->
    <div class="modal fade" id="connect_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <!-- <h5 class="modal-title" id="exampleModalLabel">Connection log</h5> -->
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <LogList title="Connection log" v-bind:items="connection_log.as_array()"></LogList>
            <LogList title="Machine log" v-bind:items="machine_log.as_array()"></LogList>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import LogList from '@/components/utils/LogList.vue'

export default {
  name: 'ConnectLog',
  props: { },
  data: () => {
    return {
      connection_log: machine.communication.connection_log,
      machine_log: machine.log,
   };
  },
  created: () => {
    // If this isn't connect.html only
    if( !window.location.pathname.match(/^\/connect\.html/) ){
      // Set up the modal to show when trying to connect and hide when done
      machine.communication.on_connecting.push(() => { $('#connect_modal').modal('show'); }); // Display the modal while connecting
      machine.communication.on_connected.push(()  => { $('#connect_modal').modal('hide'); }); // Hide it when we are finally connected
    }
    // This gets executed once the page is loaded, this is where it all begins
    // When the page is loaded, we try connecting to an active board
    $(function() {
        // Try to connect to possible targets
        machine.try_to_find_machine();
    });
  },
  components: {
    LogList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
