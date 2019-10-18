<template>
  <div class="connect">
    <div v-if="communication.try_address_list_failed">
      <h2> Please enter a new address </h2>
      <p> None of our attempts at reaching known addresses have worked, sorry </p>
      <p> Please enter the address for the board you are trying to control </p>
      <form>
        <div class="form-group">
          <label for="address">Board address :</label>
          <input v-model="address" type="text" class="form-control" id="address" aria-describedby="address_help" placeholder="Enter address">
          <small id="address_help" class="form-text text-muted">A local address looks like «192.168.1.123», «localhost» or «smoothie.local». </small>
        </div>
        <button type="submit" class="btn btn-primary" v-on:click="try_single_address">Submit</button>
      </form>
      <p> Note :You can find help with network-related topics, such as finding your board's address at <a href="http://smoothieware.org/network"> Network </a> </p>
    </div>
    <LogList title="Connection log" v-bind:items="connection_log.as_array()"></LogList>
    <LogList title="Machine log" v-bind:items="machine_log.as_array()"></LogList>
  </div>
</template>

<script>
// @ is an alias to /src
import LogList from '@/components/utils/LogList.vue'

export default {
  name: 'connect',
  data: function(){ return {
    connection_log:machine.communication.connection_log,
    machine_log:machine.log,
    address:'',
    communication:machine.communication,
  }; },
  methods: {
    try_single_address: function(){
      machine.communication.try_single_address(this.address).then(() => { }).catch(() => { });
    }
  },
  /*created: () => {
    $(function() {
        // Try to connect to possible targets
        machine.try_to_find_machine();
    });
  },*/
  components: {
    LogList
  }
}
</script>
