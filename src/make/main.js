import Vue from 'vue'
import App from '@/components/BaseApp.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
