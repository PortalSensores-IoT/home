<template>

  <div id="home">
    <h1>Sensores (Instituto La Manzana de Isaac)</h1>
    <div id="nav">
      <router-link to="/sensores">Gestion de sensores</router-link> |
      <router-link to="/mapa">Mapa del instituto</router-link>
    </div>
  </div>
  <router-view />

</template>

<style>

#home {
  text-align: center;
}

h1 {
  font: 1.5em 'Segoe UI','Century Gothic';
	color: black;
	font-weight: 400;
}

#nav {
  font-size: 18px;
  padding: 30px;
}

#nav a {
  font: 1em 'Segoe UI','Century Gothic';
	color: black;
	font-style: italic;
	font-weight: 400;
	text-decoration:none;
  font-weight: bold;
  color: #000000;
}

#nav a.router-link-exact-active {
	color:white;
}

</style>