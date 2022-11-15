import { createRouter, createWebHistory } from 'vue-router'
import Sensores from '../views/Sensores.vue'
import Sugerencias from '../views/Sugerencias.vue'
import Inicio from '../views/Inicio.vue'
import PaginaNoEncontrada from '../views/PaginaNoEncontrada.vue'
import iotController from "../middleware/iotController";

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

router.beforeResolve(async(to, from) => {
  window.localStorage.username = to.query.usuario;
  window.localStorage.email = to.query.email;
  let user = {
    username:to.query.usuario,
    email:to.query.email,
    rol:to.query.categoria,
    ultimoanio:to.query.ultimoanio,
    estecnico:to.query.estecnico,
    instituto:to.query.instituto
  };
  let result = await iotController.validarUsuario(user)
  .then(async (response) => {
    return response;
  });
  if(result !== undefined){
    if(window.localStorage.token === undefined || window.localStorage.token === ''){
      window.localStorage.token = result;
      window.localStorage.autorizaciones = JSON.stringify(await iotController.getAutorizaciones(window.localStorage.token));
    }
  }
  to.fullPath='';
})

export default router
