<template>
  <div
    class="modal fade"
    id="modalAltaSugerencia"
    tabindex="-1"
    aria-labelledby="modalAltaSugerencia"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-header"></div>
      <div class="modal-content p-3">
        <div class="d-flex flex-row justify-content-between mb-2">
          
          <h3 class="card-header card-title">Complete los datos</h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        
        <p class="" >Todos los datos son obligatorios, debe indicar el lugar y el tipo de sensor sobre el que quiere realizar una sugerencia</p>
        <form class="mx-30 needs-validation" @submit.prevent="">
          <div id="detalleSugerencia">
            <div class="mb-3 col-12">
              <label for="validationDefault05" class="form-label">
                Piso*
              </label>
              <button class="form-select d-flex" style="min-width: 154px;" type="button" id="pisoDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                {{ pisoSeleccionado === "" ? "Seleccionar piso" : pisoSeleccionado === 0 ? "Planta baja" : pisoSeleccionado }}
              </button>
              <ul class="dropdown-menu" aria-labelledby="pisoDropdown" style="width: 93% !important;">
                <li 
                  v-for="piso in pisos"
                  :key="piso"
                  :value="piso"
                >
                  <button 
                    class="dropdown-item" 
                    type="button"
                    @click="seleccionarPiso(piso)"
                  > 
                    {{ piso === 0 ? "Planta baja" : piso }}
                  </button>
                </li>
              </ul>
            </div>
            <div class="mb-3 col-12">
              <label for="validationDefault05" class="form-label">
                Área*
              </label>
              <button class="form-select d-flex" style="min-width: 154px;" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                {{ areaSeleccionada === "" ? "Seleccionar área" : areaSeleccionada.nombre }}
              </button>
              <ul class="dropdown-menu overflow-auto" aria-labelledby="areaDropdown" style="width: 93% !important; max-height: 50vh;">
                <li 
                  v-for="area in areas"
                  :key="area.id"
                  :value="area"
                >
                  <button 
                    class="dropdown-item" 
                    type="button"
                    @click="seleccionarArea(area)"
                  > 
                    {{ area.nombre }}
                  </button>
                </li>
              </ul>
            </div>
            <div class="mb-3 col-12">
              <label for="validationDefault05" class="form-label">
                Tipo de sensor*
              </label>
              <button class="form-select d-flex" style="min-width: 154px;" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                {{ tipoSensorSeleccionado === "" ? "Seleccionar área" : this.formatearString(tipoSensorSeleccionado) }}
              </button>
              <ul class="dropdown-menu overflow-auto" aria-labelledby="areaDropdown" style="width: 93% !important; max-height: 50vh;">
                <li 
                  v-for="tipo in tiposSensores"
                  :key="tipo.id"
                  :value="tipo"
                >
                  <button 
                    class="dropdown-item" 
                    type="button"
                    @click="seleccionarTipoSensor(tipo.id)"
                  > 
                    {{ this.formatearString(tipo.id) }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-auto" id="btnAltaSugerencia">
            <button
              id="btnSiguienteFormAltaSugerencia"
              class="float-right btn btn-success "
              data-bs-toggle="modal"
              data-bs-target="#ConfiguracionIFrameForm"
              :disabled="formValido"
              style="float: right !important;"
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
        <ConfiguracionIFrame v-on:informarNuevaSugerencia="informarNuevaSugerencia" :tipoSensorSeleccionado="tipoSensorSeleccionado" :areaSeleccionada="areaSeleccionada"/>
</template>

<script>
import iotController from "@/middleware/iotController.js";
import ConfiguracionIFrame from "@/components/ConfiguracionIFrame.vue";

export default {
  name: "FormAltaSugerencia",
  components: { ConfiguracionIFrame },
  data() {
    return {
      pisos:[],
      areas:[],
      tiposSensores:[],
      pisoSeleccionado:"",
      areaSeleccionada:"",
      tipoSensorSeleccionado:"",
      mostrarPlaceHolderArea:true,
      mostrarPlaceHolderPiso:true,
      mostrarPlaceHolderTipoSensor:true,
      formValido:true
    };
  },
  async beforeMount() {
    this.pisos = await iotController.getCantidadPisos();
    this.tiposSensores = await iotController.formatearTiposDeSensores(await iotController.getTiposDeSensores());
  },
  methods: {
    validarCampos(){
      this.formValido = this.mostrarPlaceHolderPiso || this.mostrarPlaceHolderArea || this.mostrarPlaceHolderTipoSensor;
    },
    async seleccionarPiso( piso ){
      this.areaSeleccionada = ""
      this.mostrarPlaceHolderArea = true;
      this.pisoSeleccionado = piso;
      this.areas = await iotController.getAreasByPiso(this.pisoSeleccionado);
      this.mostrarPlaceHolderPiso = false;
      this.validarCampos();
    },
    seleccionarArea(area){
      this.areaSeleccionada = area
      this.mostrarPlaceHolderArea = false;
      this.validarCampos();
    },
    seleccionarTipoSensor(tipo) {
      this.tipoSensorSeleccionado = tipo;
      this.mostrarPlaceHolderTipoSensor = false;
      this.validarCampos();
    },
    informarNuevaSugerencia(){
      this.$emit('recargarSugerenciasPendientes');
    },
    formatearString(string){
      return iotController.formatearString(string);
    }
  },
};
</script>