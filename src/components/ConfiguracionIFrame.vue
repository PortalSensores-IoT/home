<template>
  <div
    class="modal fade"
    id="modalIFrame"
    tabindex="-1"
    aria-labelledby="modalIFrame"
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
        <h3 class="card-header card-title">Indique sobre que periodo hará su sugerencia</h3>
        <form class="mx-30">
          <div class="mb-4 col-7 col-md-4">
            <div class="mb-3 col-3">
              <label for="validationDefault05" class="form-label">Año</label>
              <select
                v-model="anioSeleccionado"
                class="form-select"
                id="validationDefault04"
                required
              >
                <option selected :value="anioSeleccionado">
                  {{ anioSeleccionado }}
                </option>
                <option v-for="anio in anios" :key="anio" :value="anio">
                  {{ anio }}
                </option>
              </select>
            </div>
            <div class="mb-3 col-3">
              <label for="validationDefault05" class="form-label">Mes</label>
              <select
                v-model="mesSeleccionado"
                class="form-select"
                id="validationDefault04"
                required
              >
                <option selected :value="mesSeleccionado">
                  {{ mesSeleccionado }}
                </option>
                <option v-for="mes in meses" :key="mes" :value="mes">
                  {{ getNombreMes(mes) }}
                </option>
              </select>
            </div>
            <div class="col-auto">
              <button
                @click="armarURL()"
                type="submit"
                class="btn btn-success mb-3"
                data-bs-toggle="modal"
                data-bs-target="#modalEnvioSugerencia"
              >
                Siguiente
              </button>
            </div>
          </div>
        </form>
        <EnvioFormAltaSugerencia :url="url" :areaSeleccionada="this.areaSeleccionada" :tipoSensorSeleccionado="tipoSensorSeleccionado"/>
      </div>
    </div>
  </div>
</template>

<script>
import EnvioFormAltaSugerencia from './EnvioFormAltaSugerencia.vue';
export default {
  components: { EnvioFormAltaSugerencia },
  name: "ConfiguracionIFrame",
  props: {
    areaSeleccionada:String,
    tipoSensorSeleccionado:String,
  },
  data() {
    return {
      meses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      anios: [],
      mesSeleccionado: 1,
      anioSeleccionado: 2022,
      url:""
    };
  },
  methods: {
    getAnios() {
      for (let i = 2000; i <= this.anioSeleccionado; i++) {
        this.anios.push(i);
      }
    },
    getNombreMes(valor) {
      switch (valor) {
        case 1:
          return "Enero";
        case 2:
          return "Febrero";
        case 3:
          return "Marzo";
        case 4:
          return "Abril";
        case 5:
          return "Mayo";
        case 6:
          return "Junio";
        case 7:
          return "Julio";
        case 8:
          return "Agosto";
        case 9:
          return "Septiembre";
        case 10:
          return "Octubre";
        case 11:
          return "Noviembre";
        case 12:
          return "Diciembre";
      }
    },
    armarURL(){
        this.url = "https://pp1.ath.cx:8443/public/question/ca147253-9337-4489-bcbd-c5e9d43e7d27?anio=" + this.anioSeleccionado + "&mes=" + this.mesSeleccionado +  "&areaId=" + this.areaSeleccionada + "&tipoSensor=" + this.tipoSensorSeleccionado + "#hide_parameters=anio,mes,areaId,tipoSensor";
    }
  },
};
</script>
