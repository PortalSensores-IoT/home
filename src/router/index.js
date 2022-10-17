import { createRouter, createWebHistory } from 'vue-router'
import Sensores from '../views/Sensores.vue'
import Mapa from '../views/Mapa.vue'
import Inicio from '../views/Inicio.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Inicio
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
