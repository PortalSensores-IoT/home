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
  console.log(to.query)
  let user = {
    username:to.query.usuario,
    email:to.query.email,
    rol:to.query.categoria,
    ultimoanio:to.query.ultimoanio,
    estecnico:to.query.estecnico,
    instituto:to.query.instituto
  };
  if(window.sessionStorage.getItem('token') == null) {
    let result = await iotController.validarUsuario(user)
    .then(async (response) => {
      return response;
    });
    if(result !== undefined){
      if(window.sessionStorage.getItem('token') == null || window.sessionStorage.getItem('token') == ''){
        window.sessionStorage.setItem('token',result);
        window.sessionStorage.setItem('autorizaciones', JSON.stringify(await iotController.getAutorizaciones(window.sessionStorage.token)));
      }
    }
  } else {
    if(window.sessionStorage.getItem('autorizaciones') == null){
      window.sessionStorage.setItem('autorizaciones', JSON.stringify(await iotController.getAutorizaciones(window.sessionStorage.token)));
    }
  }
  to.fullPath = '';
  to.query.usuario = '';
  to.query.email = '';
  to.query.categoria = '';
  to.query.ultimoanio = '';
  to.query.estecnico = '';
  to.query.instituto = '';
})

export default router
