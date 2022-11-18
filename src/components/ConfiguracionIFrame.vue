<template>
  <div
    class="modal fade"
    id="ConfiguracionIFrameForm"
    tabindex="-1"
    aria-labelledby="modalIFrameLabelledby"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content p-3">
        <div class="d-flex flex-row justify-content-between mb-2">
          <h3 class="card-header card-title">Indique el periodo</h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        
        
        <p>Todos los campos son obligatorios, debe elegir un periodo para realizar una sugerencia</p>
        <form class="" @submit.prevent="">
          <div class="col-12">
            <div class="mb-3 col-12">
              <label for="validationDefault05" class="form-label">Año</label>
              <select
              @change="placeHolderAnio()"
                v-model="anioSeleccionado"
                class="form-select"
                id="validationDefault04"
                required
              >
                <option selected :value="anioSeleccionado" v-show="mostrarPlaceHolderAnio">
                  {{ anioSeleccionado }}
                </option>
                <option v-for="anio in anios" :key="anio" :value="anio">
                  {{ anio }}
                </option>
              </select>
            </div>
            <div class="mb-3 col-12">
              <label for="validationDefault05" class="form-label">Mes</label>
              <select
              @change="placeHolderMes()"
                v-model="mesSeleccionado"
                class="form-select"
                id="validationDefault04"
                required
              >
                <option selected :value="mesSeleccionado" v-show="mostrarPlaceHolderMes">
                  {{ getNombreMes(mesSeleccionado) }}
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
                class="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#modalEnvioSugerencia"
                :disabled="formValido"
                style="float: right !important;"
              >
                Siguiente
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
        <EnvioFormAltaSugerencia :url="url" :areaSeleccionada="this.areaSeleccionada" :tipoSensorSeleccionado="tipoSensorSeleccionado"/>
</template>

<script>
import EnvioFormAltaSugerencia from './EnvioFormAltaSugerencia.vue';
export default {
  components: { EnvioFormAltaSugerencia },
  name: "ConfiguracionIFrame",
  props: {
    areaSeleccionada:Object,
    tipoSensorSeleccionado:String,
  },
  data() {
    return {
      meses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      anios: [],
      mesSeleccionado: "Seleccione mes",
      anioSeleccionado:"Seleccione año",
      url:"",
      mostrarPlaceHolderMes:true,
      mostrarPlaceHolderAnio:true,
      formValido:true
    };
  },
  beforeMount(){
    this.getAnios();
  },
  methods: {
    getAnios() {
      for (let i = 2022; i >= 2000; i--) {
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
        default:return valor;
      }
    },
    armarURL() {
      this.url = "https://pp1.ath.cx:8443/public/question/ca147253-9337-4489-bcbd-c5e9d43e7d27?anio=" + this.anioSeleccionado + "&mes=" + this.mesSeleccionado +  "&areaId=" + this.areaSeleccionada.id + "&tipoSensor=" + this.tipoSensorSeleccionado.replaceAll(' ','_') + "#hide_parameters=anio,mes,areaId,tipoSensor";
    },
    placeHolderAnio(){
      this.mostrarPlaceHolderAnio = false;
      this.validarForm()
    },
    placeHolderMes(){
      this.mostrarPlaceHolderMes = false;
      this.validarForm()
    },
    validarForm() {
      this.formValido = this.mostrarPlaceHolderAnio || this.mostrarPlaceHolderMes;
    }
  },
};
</script>
