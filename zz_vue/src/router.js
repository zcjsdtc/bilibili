import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from './components/index.vue'
import Login from './components/login.vue'
import Space from './components/space.vue'
import Reg from './components/reg.vue'
import details from './components/details.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'home',component: Home},
    {path: '/about',name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {path: '/Index',component: Index},
    {path: '/Login',component: Login},
    {path: '/Space',component: Space},
    {path: '/Reg',component: Reg},
    {path: '/details/:uid',component: details,props:true},
  ]
})
