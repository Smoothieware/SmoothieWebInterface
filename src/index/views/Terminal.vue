<template>
  <div class="terminal container">
    <div class="center">
      <h1> Terminal </h1>
    </div>
    <form class="form-inline row">
      <div class="input-group col-10">
        <div class="input-group-prepend">
          <div class="input-group-text"> <i class="fas fa-terminal"></i> </div>
        </div>
        <input type="text" class="form-control" placeholder="Command" id="command_input">
      </div>
      <button type="submit" class="btn btn-dark col-2" v-on:click="command_entered($event)">Send</button>
    </form>
    <br/>
    <p>
      <LogList title="Terminal log" v-bind:items="machine_log"></LogList>
    </p>
  </div>
</template>
<script>
// @ is an alias to /src
import LogList from '@/components/utils/LogList.vue'

export default {
  name: 'terminal',
  components: { LogList },
  data(){
    return {
      machine_log: machine.log.as_array(),
    }
  },
  methods: {
    command_entered(event){
      var command = $("#command_input").val();
      machine.communication.command([command]).then((data) => {console.log(data); });
    }
  }
}
</script>
