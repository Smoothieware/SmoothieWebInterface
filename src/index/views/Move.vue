<template>
  <div class="move">
    <div class="container center">
      <h1> Move </h1>
    </div>
    <div class="container">
      <h2> Jog </h2>
      <JogWheel width="480" height="390" :controller="machine.control"/>
      <h2> Position </h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Coordinate system</th>
            <th scope="col">X</th>
            <th scope="col">Y</th>
            <th scope="col">Z</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Workspace</th>
            <td>{{machine.watchdog.work_position.x}}</td>
            <td>{{machine.watchdog.work_position.y}}</td>
            <td>{{machine.watchdog.work_position.z}}</td>
          </tr>
          <tr>
            <th scope="row">Machine</th>
            <td>{{machine.watchdog.machine_position.x}}</td>
            <td>{{machine.watchdog.machine_position.y}}</td>
            <td>{{machine.watchdog.machine_position.z}}</td>
          </tr>
        </tbody>
      </table>
    </div>
 </div>
</template>

<script>
import JogWheel from '@/components/utils/JogWheel.vue'

export default {
  name: 'move',
  components: {JogWheel},
  data: () => {
    return {
      machine: machine
   };
  },

}
</script>

<style lang="less">
  .center {
    text-align: center;
  }
</style>
