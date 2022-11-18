<template>
  <div
    class="modal fade"
    id="modalEnvioSugerencia"
    tabindex="-1"
    aria-labelledby="modalEnvioSugerencia"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content p-3">
        <div class="d-flex flex-row justify-content-between mb-2">
          
          <h3 class="card-header card-title">Solicitud de sugerencia</h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        
        <p>Escriba su sugerencia para seguir mejorando la institución</p>
        <form class="" @submit.prevent="">
          <div class="col-12">
            <iframe class="col-12 mb-2" height="300" width="400" :src="this.url"></iframe>

            <div class="col-12 mb-2">
              <textarea
                class="h-100 form-control"
                id="sugerenciaForm"
                rows="7"
                placeholder="Escriba su sugerencia"
                v-model="descripcion"
                required
              ></textarea>
            </div>

            <button
              @click="enviarSugerencia()"
              class="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modalEnviarAltaSugerencia"
              :disabled="descripcion==''"
            >
              Enviar sugerencia
            </button>
              
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modalEnviarAltaSugerencia" tabindex="-1" aria-labelledby="modalEnviarAltaSugerenciaLabel" aria-hidden="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Solicitando sugerencia
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="spinner-border text-success" role="status" v-if="this.muestraSpinner">
            <span class="sr-only">iot</span>
          </div>
          <div class="" role="status" v-else>
          {{this.textoConfirmacionBaja}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import iotController from "@/middleware/iotController.js";

export default {
  name: "EnvioFormAltaSugerencia",
  props: {
    url: String,
    areaSeleccionada: String,
    tipoSensorSeleccionado: String,
  },
  data() {
    return {
      descripcion: "",
      muestraSpinner: true,
      textoConfirmacionBaja: "",
    };
  },
  methods: {
    async enviarSugerencia() {
      let urls = [];
      urls.push(this.url);
      let altaSugerencia = {
        tipo: "SUGERENCIA",
        area: this.areaSeleccionada.nombre,
        tipoSensor: this.tipoSensorSeleccionado.toUpperCase().replaceAll(' ','_'),
        descripcion: this.descripcion,
        idSensor: null,
        urls: urls,
      };
      let result = await iotController.crearTicketSensor(altaSugerencia);
      this.muestraSpinner = false;
      if (result !== undefined && result !== "") {
        this.textoConfirmacionBaja = "Sugerencia enviada con exito!";
      } else {
        this.textoConfirmacionBaja = "Falló el envio de la sugerencia";
      }
    },
    nuevaPestañaGrafico() {
        window.open( this.url, '_blank');
    }
  },
};
</script>