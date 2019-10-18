<template>
  <div class="container upload">
    <h2>Upload new file</h2>

    			      <div class="card card-default">
    			        <div class="card-header"> <span class="fas fa-upload" aria-hidden="true"></span> Upload file</div>
    			        <div class="card-body">
                    <div>
                      <input class="btn btn-default" type="file" id="files" name="files[]" @change="upload($event)">
                      <label class="custom-file-label" for="customFile">Choose file</label>
                    </div>
                    <div v-if="upload_status.state === 'uploading'">
                      <h3> Uploading </h3>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" v-bind:style="{ width: upload_status.progress + '%' }"> {{upload_status.progress}} % </div>
                      </div>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Progress</th>
                            <th scope="col">Speed</th>
                            <th scope="col">Filename</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row"> {{upload_status.progress}} % </th>
                            <td> {{upload_status.speed}} / second </td>
                            <td>{{file.name}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div v-if="upload_status.state === 'done'">
                      <h3> Done uploading </h3>
                    </div>

                    <div v-if="upload_status.state === 'error'">
                      <h3> Upload error </h3>
                    </div>
    			        </div>
    			      </div>


  </div> <!-- /container -->
</template>

<script>
// @ is an alias to /src

export default {
  name: 'upload',
  components: {},
  data(){
    return {
      upload_status: { state: "none", progress: 0, speed: 0 },
      file: {}
    }
  },
  methods: {
    upload(event){
      this.file = event.target.files[0];
      machine.communication.upload(this.file, this);
    }
  }
}
</script>

<style lang="less">
</style>
