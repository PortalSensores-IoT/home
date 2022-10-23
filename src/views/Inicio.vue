<template>
  <div id="inicioBox">
    <h1>Bienvenido</h1>

    <p>
      Este es el portal del area de IOT para la gestion de sensores. Aquí podrá
      gestionar los sensores, ver el mapa de la institucion. El objetivo de este
      portal es brindar a la institucion facilidad adminitrativa y mejorar la
      experiencia de los estudiantes por el paso en la institución.
    </p>
  </div>
  <div id="footerBox"></div>
</template>

<script>
export default {
  name: "Inicio"
};
</script>

<style scoped>

#inicioBox {
  margin-top: 2%;
  padding: 2% 20%;
  background: none;
}

#inicioBox h1 {
  font: 2em "Segoe UI", "Century Gothic";
  color: black;
  font-weight: 400;
}

p {
  font: 16px 'Segoe UI','Century Gothic';
	font-weight: 400;
  color: #000000;
  text-align: center;
}

#home #footerBox{
  display: flex;
  margin-top: 8px;
  background: #1b9752;
  width: 100%;
  height: 50px;
}

</style>