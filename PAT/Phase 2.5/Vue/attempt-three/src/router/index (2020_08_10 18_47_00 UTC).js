import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Pending from '../views/Pending.vue'
import Groups from '../views/Groups.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: '/groups',
    name: 'Groups',
    component: Groups
  },
  {
    path: '/pending',
    name: 'Pending',
    component: Pending
  }
]

const router = new VueRouter({
  routes
})

export default router
