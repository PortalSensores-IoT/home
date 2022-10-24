import { createRouter, createWebHistory } from 'vue-router'
import Sensores from '../views/Sensores.vue'
import Sugerencias from '../views/Sugerencias.vue'
import Inicio from '../views/Inicio.vue'
import PaginaNoEncontrada from '../views/PaginaNoEncontrada.vue'

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
    path: '/sugerencias',
    name: 'sugerencias',
    component: Sugerencias
  },
  {
    path: '/:paginaNoEncontrada(.*)*',
    component: PaginaNoEncontrada
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  if(to.name === "inicio"){
    if(!to.query.hasOwnProperty("usuario")){
        to.query.usuario = "";
    }
    if(!to.query.hasOwnProperty("email")){
      to.query.email = "";
    }
    if(!to.query.hasOwnProperty("categoria")){
      to.query.categoria = "";
    }
    if(!to.query.hasOwnProperty("ultimoanio")){
      to.query.ultimoanio = "";
    }
  }

})

export default router
