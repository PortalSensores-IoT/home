<template>
  <div id="home">
    <div id="headBox">
      <h1>Portal sensores - IOT</h1>
      <h4>Instituto La Manzana de Isaac</h4>
    </div>
    <div id="navBox">
      <router-link id="inicioLink" to="/">Inicio</router-link>
      <router-link id="gestionSensoresLink" to="/sensores">Sensores</router-link>
      <router-link id="mapaLink" to="/mapa">Sugerencias</router-link>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  background-color: #6fa363;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#home {
  text-align: center;
}

#headBox{
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-content: center;
  padding: 50px 20px;
  font: 3em "Segoe UI", "Century Gothic";
  font-weight: 400;
  background: #1b9752;
}

#headBox h1 {
text-align: left;
width: 50%;
background: none;
color: black;
}

#headBox h4 {
text-align: right;
width: 50%;
background: none;
color: black;
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

 -webkit-box-shadow: inset 0px 22px 7px -19px rgba(0,0,0,0.36);
-moz-box-shadow: inset 0px 22px 7px -19px rgba(0,0,0,0.36);
box-shadow: inset 0px 22px 7px -19px rgba(0,0,0,0.36);
}

#gestionSensoresLink:hover, #mapaLink:hover, #inicioLink:hover {
  font: 1.5em "Segoe UI", "Century Gothic";
  font-style: italic;
  color: #000000;
  text-decoration: none;
  font-weight: bold;
  background:#044a23;
	color:white;
  transition: all 0.5s;
}

#navBox a.router-link-exact-active {
	color:white;
  border-top: none;
  background: #1b9752;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

</style>
