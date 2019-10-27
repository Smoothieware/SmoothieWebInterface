<template>
  <div>
    <div class="card" v-for="(children, category_name) in structure" v-bind:key="category_name">
      <div class="card-header">
        <h1>{{category_name}}</h1>
      </div>
      <div class='card-body'>
        <div class='row'>
          <div class="col-md-3" v-for="menu in children" v-bind:key="menu.name" v-on:click="clicked(category_name, menu)">
            <div class="fa-10x big-menu-icon" v-if="menu.display == undefined || menu.display(config)">
              <span class="fa-layers fa-fw" style="background:white">
                <i class="fas fa-circle" v-bind:style="{color: menu.color}"></i>
                <i v-bind:class="['fa-inverse', 'fas', 'fa-' + menu.icon]" data-fa-transform="shrink-8"></i>
              </span>
            </div>
            <h3> {{menu.name}} </h3>
            <p> {{menu.what}} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BigMenu',
  props: {
    structure:{type:Object, required:true}
  },
  data: function(){ return {
    config: machine.config,
  }},
  methods: {
    clicked: (category_name, menu) => { // Go to the page for that menu
      if( menu.clicked == undefined ){
        navigation.goto(category_name, menu.name, null)
      }else{
        menu.clicked.call(this, category_name, menu.name);
      }
      //navigation.goto(category_name, menu.name, null)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
/* Make these a bit more compact */
.big-menu-icon {
  margin-bottom: -30px;
  margin-top: -20px;
}

.card {
  margin-bottom: 1em;
  margin-top: 1em;
  cursor: pointer;
}
</style>
