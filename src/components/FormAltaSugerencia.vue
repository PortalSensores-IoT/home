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
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        <h3 class="card-header card-title">Solicitud de sugerencia</h3>
        <form class="mx-30">
          <div class="mb-4 col-7 col-md-4">
            <label for="asuntoForm" class="text-left form-label">Asunto</label>
            <input
              type="text"
              class="form-control"
              id="asuntoForm"
              placeholder="p. ej.: Nuevo tipo de sensor"
              required
            />
          </div>
          <div id="detalleSensor">
            <div class="mb-3 col-3">
              <label for="validationDefault05" class="form-label">Piso</label>
              <select
                @change="obtenerAreasPorPiso()"
                v-model="pisoSeleccionado"
                class="form-select"
                id="validationDefault04"
                required
              >
                <option selected :value="pisoSeleccionado">{{pisoSeleccionado}}</option>
                <option v-for="piso in pisos" :key="piso" :value="piso">
                  {{ piso }}
                </option>
              </select>
            </div>
            <div class="mb-3 col-3">
              <label for="validationDefault05" class="form-label">Área</label>
              <select class="form-select" id="validationDefault04" v-model="areaSeleccionada" required>
                <option selected :value="areaSeleccionada">{{areaSeleccionada === ''? 'Seleccionar area...' : areaSeleccionada[1]}}</option>
                <option v-for="area in areas" :key="area" :value="area">
                  {{ area[1] }}
                </option>
              </select>
            </div>
            <div class="mb-3 col-3">
              <label for="validationDefault04" class="form-label"
                >Tipo de sensor</label
              >
              <select
                v-model="tipoSensorSeleccionado"
                class="form-select"
                id="validationDefault04"
                required
              >
                <option selected :value="tipoSensorSeleccionado">{{tipoSensorSeleccionado}}</option>
                <option v-for="tipo in tiposSensores" :key="tipo" :value="tipo">
                  {{ tipo }}
                </option>
              </select>
            </div>
          </div>

          <div class="mb-5 col-12">
            <label for="sugerenciaForm" class="form-label">Descripción</label>
            <textarea
              class="h-100 form-control"
              id="sugerenciaForm"
              rows="7"
              required
            ></textarea>
          </div>

          <div class="col-auto">
            <button
              type="submit"
              v-on:click="enviarSugerencia($event)"
              class="btn btn-success mb-3"
              data-bs-toggle="modal"
              data-bs-target="#modalSugerencia"
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!--<div
    class="modal fade"
    id="modalSugerencia"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            ¡Ya guardamos tu sugerencia!
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum
          pariatur dignissimos deserunt est tenetur deleniti ut iure, quod
          numquam aspernatur.
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-success"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>-->
</template>

<script>
import iotController from '@/middleware/iotController'
export default {
  name:"FormAltaSugerencia",
  data() {
    return {
      asunto:"",
      pisos: [],
      areas: [],
      tiposSensores: [],
      tiposSensores: "",
      pisoSeleccionado: "Seleccionar piso...",
      areaSeleccionada: "",
      tipoSensorSeleccionado: "Seleccionar tipo...",
      descripcion:""
    }
  },
  async beforeMount(){
    this.pisos = await iotController.getCantidadPisos();
    this.tiposSensores = await iotController.getTiposDeSensores();
  },
  methods:{
    async obtenerAreasPorPiso(){
      this.areas = await iotController.getAreasByPiso(this.pisoSeleccionado);
    }
  }
}
</script>