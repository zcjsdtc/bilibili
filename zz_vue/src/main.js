import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'swiper-4.5.0/dist/css/swiper.css'
import 'swiper-4.5.0/dist/js/swiper.js'

Vue.config.productionTip = false

import '../public/css/mui.css'
import '../public/css/icons-extra.css'

import MintUI from "mint-ui"
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import axios from 'axios'
axios.defaults.withCredentials=true;
Vue.prototype.axios=axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
