<template>
  <div class="modal fade" id="modalBajaSensor" tabindex="-1" aria-labelledby="modalBajaSensor" aria-hidden="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Solicitud de baja de sensor
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ¿Estás seguro que desea solicitar la baja del sensor de {{ this.bajaSensor !== null ? this.bajaSensor.tipoSensor : '' }}?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">
            Cancelar
          </button>
          <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="enviarSolicitudBajaSensor()" data-bs-toggle="modal" data-bs-target="#modalConfirmaBajaSensor">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modalConfirmaBajaSensor" tabindex="-1" aria-labelledby="modalConfirmaBajaSensor" aria-hidden="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Solicitando baja de sensor
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
  props: { bajaSensor: Object },
  data() {
    return {
      muestraConfimacionEnvioSolicitud: false,
      textoConfirmacionBaja:"",
      muestraSpinner: false
    };
  },
  methods: {
    async enviarSolicitudBajaSensor() {
      let result = await iotController.crearTicketSensor(this.bajaSensor);
      this.muestraSpinner = false;
      if(result !== undefined && result !== '') {
        this.textoConfirmacionBaja = "Solicitud de baja de sensor enviado con exito!";
      } else {
        this.textoConfirmacionBaja = "Falló el envio de la solicitud";
      }
    }
  },
};
</script>
