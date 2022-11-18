<template>
  <div
    class="modal fade"
    id="modalAltaSugerencia"
    tabindex="-1"
    aria-labelledby="modalAltaSugerencia"
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
        <h3 class="card-header card-title">Complete los datos</h3>
        <p>Todos los datos son obligatorios, debe indicar el lugar y el tipo de sensor sobre el que quiere realizar una sugerencia</p>
        <form class="mx-30 needs-validation" @submit.prevent="">
          <div id="detalleSugerencia">
            <div class="mb-3 col-12">
              <label for="validationDefault05" class="form-label">
                Piso*
              </label>
              <select
                @change="obtenerAreasPorPiso()"
                v-model="pisoSeleccionado"
                class="form-select"
                id="validationDefault04"
                required
              >
              <option selected :value="pisoSeleccionado" v-show="mostrarPlaceHolderPiso">
                  {{
                    pisoSeleccionado
                  }}
                </option>
                <option v-for="piso in pisos" :key="piso" :value="piso" required>
                  {{ piso === 0 ? 'Planta baja' : piso }}
                </option>
              </select>
            </div>
            <div class="mb-3 col-12">
              <label for="validationDefault05" class="form-label">
                Lugar*
              </label>
              <select
              @change="placeHolderArea()"
                class="form-select"
                id="validationDefault04"
                v-model="areaSeleccionada"
                required
              >
                <option selected :value="areaSeleccionada" v-show="mostrarPlaceHolderArea" required>
                  {{
                    areaSeleccionada
                  }}
                </option>
                <option v-for="area in areas" :key="area" :value="area">
                  {{ area }}
                </option>
              </select>
            </div>
            <div class="mb-3 col-12">
              <label for="validationDefault04" class="form-label">
                Tipo de sensor*
              </label>
              <select
              @change="placeHolderTipoSensor()"
                v-model="tipoSensorSeleccionado"
                class="form-select"
                id="validationDefault04"
                required
              >
                <option selected :value="tipoSensorSeleccionado" v-show="mostrarPlaceHolderTipoSensor" required>
                  {{
                    tipoSensorSeleccionado
                  }}
                </option>
                <option v-for="tipo in tiposSensores" :key="tipo.descripcion" :value="tipo.descripcion">
                  {{ tipo.descripcion }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-auto" id="btnAltaSugerencia">
            <button
              id="btnSiguienteFormAltaSugerencia"
              class="btn btn-success mb-3"
              data-bs-toggle="modal"
              data-bs-target="#ConfiguracionIFrameForm"
              @click="cargarIdArea()"
              :disabled="formValido"
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
        <ConfiguracionIFrame :tipoSensorSeleccionado="tipoSensorSeleccionado" :areaSeleccionada="idArea"/>
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
      pisoSeleccionado:"Seleccionar piso",
      areaSeleccionada:"Seleccionar area",
      tipoSensorSeleccionado:"Seleccionar tipo de sensor",
      areasConID:[],
      idArea:null,
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
    async obtenerAreasPorPiso() {
      this.areasConID = await iotController.getAreasByPiso(this.pisoSeleccionado);
      for(let i = 0 ; i < this.areasConID.length ; i++) {
        this.areas.push(this.areasConID[i][1]);
      }
      this.placeHolderPiso()
    },
    placeHolderPiso() {
      this.mostrarPlaceHolderPiso = false;
      this.validarCampos();
    },
    placeHolderArea() {
      this.mostrarPlaceHolderArea = false;
      this.validarCampos();
    },
    placeHolderTipoSensor() {
      this.mostrarPlaceHolderTipoSensor = false;
      this.validarCampos();
    },
    cargarIdArea() {
      for(let i = 0 ; i < this.areasConID.length ; i++){
        if(this.areasConID[i][1] === this.areaSeleccionada) {
          let id = this.areasConID[i][0];
          let nombre = this.areasConID[i][1];
          this.idArea = {id:id, nombre:nombre};
        }
      }
    },
    validarCampos(){
      this.formValido = this.mostrarPlaceHolderPiso || this.mostrarPlaceHolderArea || this.mostrarPlaceHolderTipoSensor;
    }
  },
};
</script>