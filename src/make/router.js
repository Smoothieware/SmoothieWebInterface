import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Jobs from './views/Jobs.vue'
import File from './views/File.vue'
import Upload from './views/Upload.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/jobs/:path*',
      name: 'jobs',
      component: Jobs
    },
    {
      path: '/file/:path*',
      name: 'file',
      component: File
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
