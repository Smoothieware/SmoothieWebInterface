<template>
  <div class="container jobs">
    <div class="container center">
      <h2>Jobs</h2>
    </div>
    <FileList :path="'/' + $route.params.path + '/'"></FileList>
  </div> <!-- /container -->
</template>

<script>
// @ is an alias to /src
import FileList from '@/components/utils/FileList.vue'
export default {
  name: 'jobs',
  components: {
    FileList
  }
}
</script>

<style lang="less">
.center {
  text-align: center;
}
</style>
