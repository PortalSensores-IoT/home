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

  <!-- Footer -->
  <footer id="footerBox" class="col-12 text-center text-lg-start text-muted">
    <!-- Copyright -->
    <div class="col-12 p-3">© 2022 Copyright: IoTeam</div>
    <!-- Copyright -->
  </footer>
</template>

<script>
import Auth from "../middleware/auth.js";
import IotController from "../middleware/iotController.js";
export default {
  name: "Inicio",
  props: {
    autorizaciones: Object
  },
  data() {
    return {
    };
  }
};
</script>

<style scoped>
#cardInicioContainer {
  height: calc(90% - 80px);
}

#cardInicio {
  background-color: #daded3;
  display: flex;
  height: calc(90% - 80px);
  border-radius: 2%;
}
/*#inicioBox {
  background: #6fa363;
}

#inicioBox h1 {
  font: 2em "Segoe UI", "Century Gothic";
  color: black;
  font-weight: 400;
}

p {
  font: 16px "Segoe UI", "Century Gothic";
  font-weight: 400;
  color: #000000;
  text-align: center;
}*/

#home #footerBox {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  max-height: 70px !important;
  background-color: #daded3;
}
</style>