import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Sensores from '../views/Sensores.vue'
import Mapa from '../views/Mapa.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/sensores',
    name: 'sensores',
    component: Sensores
  },
  {
    path: '/mapa',
    name: 'mapa',
    component: Mapa
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
