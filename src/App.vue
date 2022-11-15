<template>
  <div class="spinner-border text-success" role="status" v-if="!comienzaApp">
            <span class="sr-only"> iot</span>
          </div>
  <div id="home" v-else-if="this.autorizaciones !== undefined && this.autorizaciones !== '' && this.autorizaciones.code !== 'ERR_BAD_REQUEST' && this.comienzaApp && !this.mostrarAccesoDenegado">
    <ul id="header" class="nav nav-tabs bg-light">
      <div id="navItemsContainer">
        <li class="nav-item">
          <router-link id="headerItem" to="/" class="nav-link active" aria-current="page">Inicio</router-link>
        </li>
        <li class="nav-item">
          <router-link id="headerItem" to="/sensores" class="nav-link active" aria-current="page">Sensores</router-link>
        </li>
        <li class="nav-item">
          <router-link id="headerItem" to="/sugerencias" class="nav-link active" aria-current="page">Sugerencias</router-link>
        </li>
        <!--<li class="nav-item dropdown">
          <a id="headerItem" class="nav-link dropdown-toggle nav-link active" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Sugerencias</a>
          <ul class="dropdown-menu" id="navbarDropdown">
            <li><router-link class="dropdown-item" to="/" >Ver sugerencias</router-link></li>
            <li><router-link class="dropdown-item" to="/sugerencias" >Realizar sugerencia</router-link></li>
          </ul>
        </li>-->
      </div>
      <li id="headerTitle" class="rigth-0">IoT</li>
    </ul>
    <router-view :autorizaciones="autorizaciones"/>
  </div>
  <div id="accessDenied" class="center-0" v-else-if="this.mostrarAccesoDenegado">
    <PaginaNoEncontrada/>
  </div>
</template>

<script>
import PaginaNoEncontrada from '../src/views/PaginaNoEncontrada.vue';
import iotController from "../src/middleware/iotController.js";
import auth from "../src/middleware/auth.js";

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
      if(localStorage.autorizaciones !== 'undefined' && localStorage.autorizaciones !== undefined) {
        this.autorizaciones = JSON.parse(localStorage.autorizaciones);
        this.comienzaApp = true;
        this.mostrarAccesoDenegado = false;
      } else {
        this.mostrarAccesoDenegado = true;
        this.comienzaApp = true;
      }
    }, this.pantallaDeCarga);
  },
  beforeUnmount(){
    //Auth.clearLocalStorage();
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#home {
  display: flex;
  flex-direction: column;
  background-color: #6fa363;
  text-align: center;
  height: 100vh;
}

#headBox h1 {
  font: 50px 'Segoe UI','Century Gothic';
	font-weight: 400;
  justify-content: left;
  padding: 0;
  text-align: left;
  width: 50%;
  background: none;
  color: rgb(255, 255, 255);
}

#header{
  display: flex;
  align-content: flex-end;
  justify-content: space-between;
  background-color: #fff;
  margin-bottom: 1em !important;
  max-height: 70px;
  min-height: 70px;
}

#navItemsContainer{
  height: 100%;
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  margin-bottom: 0;
}

#headerTitle{
  font-size: 40px;
  margin-right: 1em;
}

#headerItem:hover{
  background-color: #DADED3;
}


#navbarDropdown {
  margin-top: -2.1px !important;
}

</style>
