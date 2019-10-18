<template>
  <div class="monitor">
    <div class="container center">
      <h1> Monitor </h1>
    </div>
    <div class="container">
      <p v-if="machine.player.playing">
        Currently playing <kbd>{{machine.player.status.file}}</kbd>
      </p>
      <h2> Progress </h2>
      <p>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Percent</th>
              <th scope="col">Elapsed</th>
              <th scope="col">Estimated left</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{{machine.player.status.percent}}%</th>
              <td>{{machine.player.status.elapsed.hours}}:{{machine.player.status.elapsed.minutes}}:{{machine.player.status.elapsed.seconds}}</td>
              <td>{{machine.player.status.estimated.hours}}:{{machine.player.status.estimated.minutes}}:{{machine.player.status.estimated.seconds}}</td>
            </tr>
          </tbody>
        </table>

      </p>
      <h2> Actions </h2>
    </div>
    <br/>

  </div> <!-- /container -->
</template>

<script>
export default {
  name: 'start',
  components: {

  },
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
