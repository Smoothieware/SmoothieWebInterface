import Vue      from 'vue'
import Router   from 'vue-router'
import Play     from './views/Play.vue'
import Start    from './views/Start.vue'
import Monitor  from './views/Monitor.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/play/:path*',
      name: 'play',
      component: Play
    },
    {
      path: '/start/:path*',
      name: 'start',
      component: Start,
    },
    {
      path: '/monitor/',
      name: 'monitor',
      component: Monitor,
    }
  ]
})
