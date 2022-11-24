<template>
  <div id="inicioBox" class="d-flex flex-row align-items-center h-100" >
    <div id="contenedorTextoInicio" class="d-flex flex-column h-75 mt-15 w-50">
      
      
            <h1 id="tituloInicio" class="mb-4">¡BIENVENIDO!</h1>
            <p id="textoInicio" class="blockquote">
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
    

    <div id="contenedorImagenInicio" class="d-flex w-100 overflow-hidden align-items-center h-100 pt-4">
      <img class="w-100 mt-4" src="../assets/inicio2.png" >
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
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Alata&family=Lato&display=swap');

#cardInicioContainer {
  height: calc(90% - 80px);
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

img{
  filter: hue-rotate(271deg) saturate(53.2%) brightness(105.2%);
  width: 105% !important;
}

#tituloInicio{
  font-family: 'Lato', sans-serif;
  font-size: 3em;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.645);
}

#textoInicio{
  color: rgb(75, 75, 75);
  font-weight: 400;
  font-size: 17px;
  font-family: 'Alata', sans-serif;
  text-align: left;
}

#contenedorImagenInicio{
  height: calc(100vh - 70px);
}
</style>