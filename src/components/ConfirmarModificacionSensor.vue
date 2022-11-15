<template>
  <div class="modal fade" id="modalModificaSensor" tabindex="-1" aria-labelledby="modalModificaSensor" aria-hidden="false">
    <div class="modal-dialog">
      <div class="modal-content p-2">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Modificar sensor de {{ this.modificaSensor !== null ? this.modificaSensor.tipoSensor : '' }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
         <div class="mb-5 col-12">
        <textarea class="h-100 form-control" id="sugerenciaForm" rows="7" placeholder="Describa su modificacion" v-model="descripcion" required></textarea>
      </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">
            Cancelar
          </button>
          <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="enviarSolicitudModificacionSensor()" data-bs-toggle="modal" data-bs-target="#modalConfirmaModificacionSensor">
            Enviar sugerencia
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="modalConfirmaModificacionSensor" tabindex="-1" aria-labelledby="modalConfirmaModificacionSensor" aria-hidden="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Solicitando modificacion
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


export default {
    props:{modificaSensor:Object, sensoreSeleccionado:Object},
    data(){
        return {
            muestraSpinner:true,
            textoConfirmacionBaja:'modificacionSolicitada',
            descripcion:''
        };
    },
    methods:{
        async enviarSolicitudModificacionSensor() {
          let result = await iotController.crearTicketSensor(this.modificaSensor);
          this.muestraSpinner = false;
          if(result !== undefined && result !== '') {
            this.textoConfirmacionBaja = "Solicitud de modificacion de sensor enviado con exito!";
          } else {
            this.textoConfirmacionBaja = "Falló el envio de la solicitud";
          }
        }
    }
}
</script>