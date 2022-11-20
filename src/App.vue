<template>
  <div id="loaderContainer" class="w-100" v-if="!comienzaApp">
    <div id="loader" class="spinner-border text-success" role="status" >
      <span class="fs-1"> IoT</span>
    </div>
  </div>
  



  <div class="container-fluid" v-else-if="this.autorizaciones !== undefined && this.autorizaciones !== '' && this.autorizaciones.code !== 'ERR_BAD_REQUEST' && this.comienzaApp && !this.mostrarAccesoDenegado">
    <div class="row flex-nowrap">
      <div id="sidebarMenu" class="col-auto col-md-2 col-xl-2 px-sm-2 px-0">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-2 pt-2 text-white min-vh-100">
          <router-link to="/" class="d-flex align-items-center pt-3 pb-26 mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-3 d-none d-sm-inline">IoT</span>
          </router-link>

          <br/>
          <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100" id="menu">
            <li class="nav-item w-100">
              <router-link to="/" id="menuItem" class="nav-link align-middle px-0">
                <font-awesome-icon icon="fa-solid fa-house" /> <span class="ms-1 d-none d-sm-inline">Inicio</span>
              </router-link>
            </li>
            <li class="nav-item w-100">
              <router-link to="/sensores" id="menuItem" class="nav-link align-middle px-0">
                <font-awesome-icon icon="fa-solid fa-tower-broadcast" /> <span class="ms-1 d-none d-sm-inline">Sensores</span>
              </router-link>
            </li>
            <li class="nav-item w-100">
              <router-link to="/sugerencias" id="menuItem" class="nav-link align-middle px-0">
                <font-awesome-icon icon="fa-solid fa-table-list" /> <span class="ms-1 d-none d-sm-inline">Sugerencias</span>
              </router-link>
            </li>
            <li class="nav-item w-100">
              <router-link to="/solicitudes" id="menuItem" class="nav-link align-middle px-0">
                <font-awesome-icon icon="fa-solid fa-pen" /> <span class="ms-1 d-none d-sm-inline">Solicitudes</span>
              </router-link>
            </li>
          </ul>
          <!--
            <hr>
          <div class="dropdown pb-4">
            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle">
              <span class="d-none d-sm-inline mx-1">loser</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
              <li><a class="dropdown-item" href="#">New project...</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="#">Sign out</a></li>
            </ul>
          </div>-->
        </div>
      </div>
      <div class="col px-0" id="contenedorVistas">
        <nav class="navbar shadow-sm px-4" id="headerVistas">
          <a class="navbar-brand" href="#">Vista</a>
        </nav>
        <div class="px-4 pt-3 w-100" >
          <router-view :autorizaciones="autorizaciones"/>
        </div>
      </div>
    </div>
  </div>


  <div id="accessDenied" class="center-0" v-else-if="this.mostrarAccesoDenegado">
    <PaginaNoEncontrada />
  </div>
</template>

<script>
import PaginaNoEncontrada from '../src/views/PaginaNoEncontrada.vue';
import iotController from "../src/middleware/iotController.js";
import auth from "../src/middleware/auth.js";

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: "App",
  components:{PaginaNoEncontrada},
  data() {
    return {
      autorizaciones:'',
      comienzaApp:false,
      mostrarAccesoDenegado:false,
      pantallaDeCarga:5000
    };
  },
  methods:{
  },
  beforeMount(){
    setTimeout(() => {
      if(window.sessionStorage.getItem('autorizaciones') != null && window.sessionStorage.getItem('autorizaciones') != '' && window.sessionStorage.getItem('autorizaciones') !== 'undefined' && window.sessionStorage.getItem('autorizaciones') !== undefined) {
        this.autorizaciones = JSON.parse(window.sessionStorage.getItem('autorizaciones'));
        this.comienzaApp = true;
        this.mostrarAccesoDenegado = false;
      } else {
        this.mostrarAccesoDenegado = true;
        this.comienzaApp = true;
      }
    }, this.pantallaDeCarga);
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#loaderContainer{
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100vh;
}
#loader{
  
  margin: auto;
  width: 70px;
  height: 70px;
}



#sidebarMenu{
  background-color: #6fa363;
  max-width: 220px;
}

#menuItem{
  width: 100%;
  font-size: 1.2rem;
  padding: .6rem 1rem;
  color: rgba(255, 255, 255, 0.8);
  border-top: 1px solid rgba(255, 255, 255, 0.207);
  border-radius: 0;
}

#menuItem:hover{
  color: rgb(255, 255, 255);
}

#menuItem span{
  margin: 0 !important;
}

#contenedorVistas{
  background-color: #DADED3;
}

#headerVistas{
  background-color: #fff;
}

.btn-outline-success{
  border-color: #6fa363 !important;
  color: #6fa363;
}

.btn-outline-success:hover,
.btn-check:checked+.btn, 
.btn.active, 
.btn.show,.btn:first-child:active, 
:not(.btn-check)+.btn:active,
.btn-success{
  background-color: #6fa363 !important;
  border-color: #6fa363 !important;
}

.btn-success:hover{
  background-color: #6c9663 !important;
}


/* Scroll bar */
::-webkit-scrollbar {
  width: 3px;
  background-color: rgb(212, 211, 211);
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(171, 170, 170); 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #8c8c8c; 
}


</style>
