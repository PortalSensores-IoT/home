<template>
  <div
    class="modal fade"
    id="modalEnvioSugerencia"
    tabindex="-1"
    aria-labelledby="modalEnvioSugerencia"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
        <h3 class="card-header card-title">Solicitud de sugerencia</h3>
        <form class="mx-30">
          <div class="mb-4 col-7 col-md-4">
            <div class="mb-3 col-3">
              <iframe
                class="iFrameClass"
                style="display: none"
                id="iframe_id"
                :src="url"
                frameborder="0"
                width="800"
                height="600"
                allowtransparency
              ></iframe>
            </div>
            <div class="mb-5 col-12">
              <textarea
                class="h-100 form-control"
                id="sugerenciaForm"
                rows="7"
                placeholder="Escriba su sugerencia"
                v-model="descripcion"
                required
              ></textarea>
            </div>
            <div class="col-auto">
              <button
                @click="enviarSugerencia()"
                type="submit"
                class="btn btn-success mb-3"
                data-bs-toggle="modal"
                data-bs-target="#modalEnvioSugerencia"
              >
                Enviar sugerencia
              </button>
            </div>
          </div>
        </form>
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
import iotController from "@/middleware/iotController.js"

export default {
  name: "EnvioFormAltaSugerencia",
  props: {
    url: String,
    areaSeleccionada:String,
    tipoSensorSeleccionado:String
  },
  data() {
    return {
        descripcion:"",
        muestraSpinner:true,
        textoConfirmacionBaja:""
    };
  },
  methods:{
    enviarSugerencia(){
        let urls = [];
        urls.push(this.url);
        let altaSugerencia = {tipo:'SUGERENCIA' , tipoSensor:this.tipoSensorSeleccionado, area:this.areaSeleccionada, descripcion:this.descripcion, idSensor:id, urls:[]};
        console.log("SUGERENCIA A ENVIAR " + altaSugerencia);
        iotController
        this.muestraSpinner = false;
        if(result !== undefined && result !== '') {
            this.textoConfirmacionBaja = "Sugerencia enviada con exito!";
        } else {
            this.textoConfirmacionBaja = "Falló el envio de la sugerencia";
        }
    }
  }
};
</script>