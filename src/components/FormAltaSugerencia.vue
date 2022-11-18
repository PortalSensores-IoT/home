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
        <form class="mx-30">
          <div id="detalleSugerencia">
            <div class="mb-3 col-3">
              <label for="validationDefault05" class="form-label">Piso</label>
              <select
                @change="obtenerAreasPorPiso();placeHolderPiso()"
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
                <option v-for="piso in pisos" :key="piso" :value="piso">
                  {{ piso === 0 ? 'Planta baja' : piso }}
                </option>
              </select>
            </div>
            <div class="mb-3 col-3">
              <label for="validationDefault05" class="form-label">Área</label>
              <select
              @change="placeHolderArea()"
                class="form-select"
                id="validationDefault04"
                v-model="areaSeleccionada"
                required
              >
                <option selected :value="areaSeleccionada" v-show="mostrarPlaceHolderArea">
                  {{
                    areaSeleccionada
                  }}
                </option>
                <option v-for="area in areas" :key="area" :value="area">
                  {{ area }}
                </option>
              </select>
            </div>
            <div class="mb-3 col-3">
              <label for="validationDefault04" class="form-label">
                Tipo de sensor
              </label>
              <select
              @change="placeHolderTipoSensor()"
                v-model="tipoSensorSeleccionado"
                class="form-select"
                id="validationDefault04"
                required
              >
                <option selected :value="tipoSensorSeleccionado" v-show="mostrarPlaceHolderTipoSensor">
                  {{
                    tipoSensorSeleccionado
                  }}
                </option>
                <option v-for="tipo in tiposSensores" :key="tipo" :value="tipo">
                  {{ tipo }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-auto">
            <button
              type="submit"
              class="btn btn-success mb-3"
              data-bs-toggle="modal"
              data-bs-target="#modalIFrame"
            >
              Siguiente
            </button>
          </div>
        </form>
        <ConfiguracionIFrame
          :tipoSensorSeleccionado="tipoSensorSeleccionado"
          :areaSeleccionada="areaSeleccionada"
        />
      </div>
    </div>
  </div>
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
      mostrarPlaceHolderArea:true,
      mostrarPlaceHolderPiso:true,
      mostrarPlaceHolderTipoSensor:true
    };
  },
  async beforeMount() {
    this.pisos = await iotController.getCantidadPisos();
    let tipoSensorList = await iotController.getTiposDeSensores();
    for(let i = 0 ; i < tipoSensorList.length ; i++){
      if(tipoSensorList[i] !== 'NO_IDENTIFICADO') {
        this.tiposSensores.push(tipoSensorList[i].toLowerCase().replaceAll('_',' '));
      }
    }
  },
  methods: {
    async obtenerAreasPorPiso() {
      let areasList = await iotController.getAreasByPiso(this.pisoSeleccionado);
      for(let i = 0 ; i < areasList.length ; i++) {
        this.areas.push(areasList[i][1]);
      }
    },
    placeHolderArea() {
      this.mostrarPlaceHolderArea = false;
    },
    placeHolderPiso() {
      console.log(this.pisoSeleccionado);
      console.log(this.areaSeleccionada);
      console.log(this.tipoSensorSeleccionado);
      this.mostrarPlaceHolderPiso = false;
    },
    placeHolderTipoSensor() {
      this.mostrarPlaceHolderTipoSensor = false;
    }
  },
};
</script>