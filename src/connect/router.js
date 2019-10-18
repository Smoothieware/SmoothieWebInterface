import Vue from 'vue'
import Router from 'vue-router'
import Connect from './views/Connect.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'connect',
      component: Connect
    },
  ]
})
