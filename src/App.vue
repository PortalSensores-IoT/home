<template>
  <div id="home" v-show="this.user.autorizado">
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
      </div>
     
      <!--<li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Dropdown</a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
        </ul>
      </li>-->
      <li id="headerTitle" class="rigth-0">IoT</li>
      
    </ul>
    
    <router-view @validacionUsuario="setUser($event)" :user="user"/>
  </div>
  <div id="accessDenied" class="center-0" v-show="!this.user.autorizado">
    <PaginaNoEncontrada/>
  </div>
</template>

<script>
import PaginaNoEncontrada from '../src/views/PaginaNoEncontrada.vue';
export default {
  name: "App",
  components:{PaginaNoEncontrada},
  data() {
    return {
      user:{
          userName: "",
          email: "",
          rol: "",
          ultimoAnio: "",
          autorizado: false,
        }
    };
  },
  methods:{
    setUser(dataUser) {
      this.user = dataUser;
    }
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

/*#headBox h4 {
  display: flex;
  font: 30px 'Segoe UI','Century Gothic';
  position: relative;
  text-align: right;
  justify-content: right;
  align-items: center;
  width: 50%;
  background: none;
  color: rgb(255, 255, 255);
}

#navBox {
  margin-top: 10px;
}

#navBox a {
  margin: 0 10px;
  font: 1.5em "Segoe UI", "Century Gothic";
  font-style: italic;
  color: #000000;
  padding: 10px 20px;
  text-decoration: none;
  font-weight: bold;
  border-radius: 0 0 3px 3px;
  background: #1b9752;
  -webkit-box-shadow: inset 0px 22px 7px -19px rgba(0, 0, 0, 0.36);
  -moz-box-shadow: inset 0px 22px 7px -19px rgba(0, 0, 0, 0.36);
  box-shadow: inset 0px 22px 7px -19px rgba(0, 0, 0, 0.36);
}

#gestionSensoresLink:hover,
#mapaLink:hover,
#inicioLink:hover {
  font: 1.5em "Segoe UI", "Century Gothic";
  font-style: italic;
  color: #000000;
  text-decoration: none;
  font-weight: bold;
  background: #044a23;
  color: white;
  transition: all 0.5s;
}

#navBox a.router-link-exact-active {
  color: white;
  border-top: none;
  background: #1b9752;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}*/

</style>
