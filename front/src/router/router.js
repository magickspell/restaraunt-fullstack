import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Menu from '../views/Menu.vue'

const routes = [
  { path: '/', redirect: { name: 'menu' } },
  {
    path: '/menu' || '/',
    name: 'menu',
    component: Menu,
  },
  {
    path: '/info',
    name: 'info',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
