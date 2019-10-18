<template>
  <div class="filelist">
    <div v-if="error" class="callout callout-danger">
      <h4> <i class="fas fa-exclamation-circle fa-fw fa-lg"></i> Error </h4>
      <p> {{error}} </p>
    </div>
    <div v-else>
      <table class="table table-striped">
        <thead class='thead-dark'>
        <tr>
          <th style="width:30px;"></th>
          <th> File name </th>
          <th style="width:100px;"> Size </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="file in file_list" v-bind:key="file.name">
            <td>
              <div v-if="file.folder">
                <i class="fas fa-folder fa-fw fa-lg"></i>
              </div>
              <div v-else>
                <i v-if="file.name.match(/txt$/)"              class="fas fa-file-word fa-fw fa-lg"></i>
                <i v-else-if="file.name.match(/^config/)"      class="fas fa-file-signature fa-fw fa-lg"></i>
                <i v-else-if="file.name.match(/^firmware/)"    class="fas fa-microchip fa-fw fa-lg"></i>
                <i v-else-if="file.name.match(/(nc|gcode)$/)"  class="fas fa-file-code fa-fw fa-lg"></i>
                <i v-else-if="file.name.match(/(png|jpg)$/)"   class="fas fa-file-image fa-fw fa-lg"></i>
                <i v-else-if="file.name.match(/(html)$/)"      class="fas fa-file-invoice fa-fw fa-lg"></i>
                <i v-else                                      class="fas fa-file-alt fa-fw fa-lg"></i>
              </div>
            </td>
            <td v-if="file.folder" class="filename"> <router-link :to="{path: file.name + '/'}">{{file.name}}</router-link> </td>
            <td v-else             class="filename"> <router-link :to="'/file' + file.path">{{file.name}}</router-link> </td>
            <td> {{file.size}} </td>
        </tr>
        </tbody>
      </table>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li v-for="step in steps" class="breadcrumb-item" v-bind:key="step.name" v-bind:class="{ active: step.last }">
            <span v-if="step.last">
              {{step.name}}
            </span>
            <span v-else>
              <router-link :to="'/jobs/' + step.path + '/'">{{step.name}}</router-link>
            </span>
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileList',
  data(){ return {
    file_list: [],
    error: ''
  }},
  props:{path:String},
  mounted(){
    var that = this;
    machine.communication.on_connected.push( () => {
      machine.files.list(that.path).then((files) => { that.error = ''; that.file_list = files; }).catch((why) => { that.error = why; });
    });
  },
  watch: {
    '$route' () {
      var that = this;
      machine.files.list(that.path).then((files) => { that.error = ''; that.file_list = files; }).catch((why) => { that.error = why; });
    }
  },
  computed: {
    steps: function(){
      var done = []; var result = [];
      var short_path = this.path.replace(/(^\/|\/$)/g,'').split('/');
      short_path.forEach((item) => { done.push(item); result.push({path:done.join('/'), name:item, last: short_path.length == result.length+1 }); });
      return result;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.filename{
  font-family: monospace;
}
</style>
