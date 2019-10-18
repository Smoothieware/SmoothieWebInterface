<template>
  <div class="container file">
    <div class="container center">
      <h1><kbd>/{{$route.params.path}}</kbd></h1>
    </div>
    <div class="container">
      <h1> File details </h1>
      <p>
        <table class="table">
  <tbody>
    <tr>
      <th scope="row">Name</th>
      <td>{{file_info.name}}</td>
    </tr>
    <tr>
      <th scope="row">Path</th>
      <td>{{file_info.path}}</td>
    </tr>
    <tr>
      <th scope="row">Size</th>
      <td>{{file_info.size}} <span class="badge badge-secondary"> {{file_info.bytes }} bytes </span> </td>
    </tr>
  </tbody>
</table>
      </p>
      <BigMenu v-bind:structure="actions"></BigMenu>
      <p> Test </p>
      <p> Partial execution </p>

      <h2> Preview </h2>
      <p> Test </p>

    </div>
  </div> <!-- /container -->
</template>

<script>
import BigMenu from '@/components/utils/BigMenu.vue'

export default {
  name: 'file',
  components: {
    BigMenu
  },
  computed: {
    file_info: function(){
      // We save this when we do ls, and retrieve it from local storage so we don't have to ask again each time we look at a file's page
      return storage.read('file_info')['/' + this.$route.params.path];
    },
    actions: function(){
      var that = this;
      return {'Actions': [
        {
              name: 'Play',
              icon: 'play-circle',
              color: '#2ECC40',
              what: 'Execute this job file on the machine',
              display: () => that.$route.params.path.match(/(gcode|nc)$/g),
              clicked: (category_name, menu_name) => {navigation.goto('monitor', menu_name + '/' + that.$route.params.path, null)},
        },{
              name: 'Edit',
              icon: 'edit',
              color: '#0074D9',
              what: 'Edit this file\'s contents',
              clicked: (category_name, menu_name) => {navigation.goto('make', menu_name + '/' + that.$route.params.path, null)},
        },{
              name: 'Rename',
              icon: 'file-signature',
              color: '#3D9970',
              what: 'Change this file\'s name',
              clicked: (category_name, menu_name) => {navigation.goto('make', menu_name + '/' + that.$route.params.path, null)},
        },{
              name: 'Move',
              icon: 'people-carry',
              color: '#FF851B',
              what: 'Move this file to a new location',
              clicked: (category_name, menu_name) => {navigation.goto('make', menu_name + '/' + that.$route.params.path, null)},
        },{
              name: 'Delete',
              icon: 'trash-alt',
              color: '#FF4136',
              what: 'Prepare the machine for a job',
              clicked: (category_name, menu_name) => {navigation.goto('make', menu_name + '/' + that.$route.params.path, null)},
        },{
              name: 'Prepare',
              icon: 'screwdriver',
              color: '#444',
              what: 'Navigate and play job files',
              display: () => that.$route.params.path.match(/(gcode|nc)$/g),
              clicked: (category_name, menu_name) => {navigation.goto('make', menu_name + '/' + that.$route.params.path, null)},
        },
      ]};
    }
  }

}
</script>

<style lang="less">
  .center {
    text-align: center;
  }
</style>
