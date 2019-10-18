<template>
  <div class="loglist">
    <h2 v-if="items.length">{{ title }}</h2>
    <p>
      <ul class='milestones'>
        <li v-for="item in items" v-bind:key="item.text">
          <div class="fa-2x milestone-icon">
            <span class="fa-layers fa-fw" style="background:white">
              <i :class="'milestone-' + item.color + ' fas fa-circle'"></i>
              <i :class="'fas fa-' + item.icon " data-fa-transform="shrink-8" style="color:white;"></i>
            </span>
          </div>
          <span v-html="item.text"></span>
        </li>
      </ul>
    </p>
  </div>
</template>

<script>
export default {
  name: 'LogList',
  props: { title: String, items: Array }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

  .milestone-icon{
    margin-left: -45px;
    margin-top: -15px;
    float: left;
    position: relative;
    border-radius: 14.5px;
  }
  .milestones {
    list-style-type: none;
    padding-left: 14.5px;
  }
  .milestones.milestones-bordered {
    border-bottom: 2px solid lightgrey;
    border-top: 2px solid lightgrey;
  }
  .milestones.milestones-bordered-top {
    border-top: 2px solid lightgrey;
  }
  .milestones.milestones-bordered-bottom {
    border-bottom: 2px solid lightgrey;
  }
  .milestones > li {
    border-left: 1px dotted lightgrey;
    border-bottom: 1px dotted lightgrey;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 25px;
    min-height: 50px;
  }
  .milestones > li h1,
  .milestones > li h2,
  .milestones > li h3,
  .milestones > li h4,
  .milestones > li h5,
  .milestones > li h6 {
    margin-top: 0px;
    margin-bottom: 5px;
  }
  .milestones > li .list-group:last-child,
  .milestones > li .panel:last-child,
  .milestones > li .well:last-child,
  .milestones > li .table:last-child,
  .milestones > li .alert:last-child,
  .milestones > li .progress:last-child,
  .milestones > li pre:last-child {
    margin-bottom: 5px;
  }
  .milestones > li:last-child {
    border-bottom: none;
  }

  .milestone-default {
    color: #aaa;
  }
  .milestone-primary {
    color: #337ab7;
  }
  .milestone-success {
    color: #5cb85c;
  }
  .milestone-info {
    color: #5bc0de;
  }
  .milestone-warning {
    color: #f0ad4e;
  }
  .milestone-danger,
  .milestone-error {
    color: #d9534f;
  }


</style>
