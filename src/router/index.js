import { createRouter, createWebHistory } from 'vue-router'
import Sensores from '../views/Sensores.vue'
import Solicitudes from '../views/Solicitudes.vue'
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
    path: '/solicitudes',
    name: 'solicitudes',
    component: Solicitudes
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
  window.onbeforeunload = function(event) {
    
    //window.localStorage.clear()
    //window.localStorage.clear()
    }
  //window.localStorage.username = to.query.usuario;
  //window.localStorage.email = to.query.email;
  let user = {
    username:to.query.usuario,
    email:to.query.email,
    rol:to.query.categoria,
    ultimoanio:to.query.ultimoanio,
    estecnico:to.query.estecnico,
    instituto:to.query.instituto
  };
  if(window.localStorage.getItem('token') == null) {
    let result = await iotController.validarUsuario(user)
    .then(async (response) => {
      return response;
    });
    if(result !== undefined){
      if(window.localStorage.getItem('token') == null || window.localStorage.getItem('token') == ''){
        window.localStorage.token = result;
        window.localStorage.autorizaciones = JSON.stringify(await iotController.getAutorizaciones(window.localStorage.token));
      }
    }
    to.fullPath='';
  } else {
    if(window.localStorage.getItem('autorizaciones') == null){
      window.localStorage.autorizaciones = JSON.stringify(await iotController.getAutorizaciones(window.localStorage.token));
    }
  }
})

export default router
