<template>
  <div id="inicioBox" class="d-flex flex-row align-items-center h-100" >
    <div class="d-flex flex-column h-75 mt-15 w-50">
      <h1>¡Bienvenido!</h1>

      <p class="blockquote">
        El Internet de las cosas describe objetos físicos con sensores, capacidad de procesamiento, 
        software y otras tecnologías que se conectan e intercambian datos con otros dispositivos y 
        sistemas a través de internet u otras redes de comunicación.
        <br><br>
        Este es el portal del area de IOT para la gestion de sensores. Aquí podrá
        gestionar los sensores. El objetivo de este
        portal es brindar a la institucion facilidad adminitrativa y mejorar la
        experiencia de los estudiantes por el paso en la institución.
      </p>
    </div>
    

    <div class="w-75 overflow-hidden">
      <img src="../assets/inicio2.png" >
    </div>
    </div>
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