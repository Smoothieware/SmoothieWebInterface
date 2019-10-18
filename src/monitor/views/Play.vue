<template>
  <div class="play">
    <div class="container center">
      <h1> Preparing to play <kbd>/{{$route.params.path}}</kbd> </h1>
    </div>
    <br/>
    <div class="container center">
      <router-link class="btn btn-primary btn-lg" :to="'/start/' + $route.params.path + '/'">
        <i class="fas fa-play fa-fw"></i>
        Start playing now
      </router-link>
    </div>
    <br/>
    <div class="container">
      <h2> Preparation activites </h2>
      <p> Here things we can do right before starting a print </p>
    </div>
  </div> <!-- /container -->
</template>

<script>
export default {
  name: 'play',
  components: {
  }
}
</script>

<style lang="less">
  .center {
    text-align: center;
  }
</style>
