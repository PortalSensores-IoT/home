<template>
  <div id="inicioBox">
    <h1>Bienvenido</h1>

    <p class="blockquote">
      Este es el portal del area de IOT para la gestion de sensores. Aquí podrá
      gestionar los sensores, ver el mapa de la institucion. El objetivo de este
      portal es brindar a la institucion facilidad adminitrativa y mejorar la
      experiencia de los estudiantes por el paso en la institución.
    </p>
    <div id="imageContainer">
      <img @click="showModal = !showModal" src="../assets/imgBienvenida.png" /><img />
    </div>
    <h1 v-if="showModal">IOT TEAM EL MEJOR GRUPO!</h1>
  </div>
</template>

<script>
export default {
  name: "Inicio",
  data() {
    return {
      showModal:false
    };
  },
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
  color: #000000;
  text-align: center;
}

img {
  height: 5vh;
  align-content: center;
  border-image-width: 0;
  background: none;
}

#imageContainer {
  display: flex;
  justify-content: center;
  width: 100%;
  background: none;
}

</style>