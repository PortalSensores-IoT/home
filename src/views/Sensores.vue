<template>

  <div class="card mt-2 shadow">
    <div id="sensoresButtons" class="card-header bg-light d-flex flex-row">
      <!--Button Seleccionar piso-->
      <div class="dropdown me-2">
        <button class="btn btn-outline-success dropdown-toggle" style="min-width: 154px;" type="button" id="pisoDropdown" data-bs-toggle="dropdown" aria-expanded="false">
          {{ pisoSeleccionado === "" ? "Seleccionar piso" : pisoSeleccionado === 0 ? "Planta baja" : pisoSeleccionado }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="pisoDropdown">
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

      <!--Button Seleccionar área-->
      <div class="dropdown me-2">
        <button class="btn btn-outline-success dropdown-toggle" style="min-width: 154px;" type="button" id="areaDropdown" data-bs-toggle="dropdown" aria-expanded="false">
          {{ areaSeleccionada === "" ? "Seleccionar área" : areaSeleccionada.nombre }}
        </button>
        <ul class="dropdown-menu overflow-auto" aria-labelledby="areaDropdown" style="max-height: 50vh;">
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

      <button 
        id="btnBuscar"
        :disabled="this.areaSeleccionada === ''" 
        class="btn btn-success me-2" 
        @click="buscarSensores()"
      >
        Buscar
      </button>

      <button 
        id="btnTiempoReal"
        :disabled="this.areaSeleccionada === ''" 
        class="btn btn-success" 
        @click="redireccionarSensoresEnTiempoReal()"
      >
        Ver en tiempo real
      </button>

      <button id="btnAlta" class="btn btn-success ms-auto" data-bs-toggle="modal" data-bs-target="#modalAltaSensor" @click="obtenerTiposDeSensores()" v-show="this.autorizaciones['Alta sensor']">
        Solicitar alta sensor
      </button>
      <FormAltaSensor :tiposSensores="tiposSensores" :pisos="pisos"/>

    </div>

    <registroTable :tituloTabla="tituloTabla" :sensoresInArea="sensoresInArea" :autorizaciones="autorizaciones" :areaSeleccionada="areaSeleccionada"/>
  </div>
</template>


<script>
import RegistroTable from "@/components/RegistroTable.vue";
import FormAltaSensor from "@/components/FormAltaSensor.vue";
import iotController from "@/middleware/iotController.js";

export default {
  name: "Sensores",
  components: { RegistroTable, FormAltaSensor},
  props:{
    autorizaciones:Object
  },
  data() {
    return {
      pisos: [],
      areas: [],
      areasCombox: [],
      tiposSensores:[],
      pisoSeleccionado: "",
      areaSeleccionada: "",
      sensoresInArea: null,
      tituloTabla: "Tabla de sensores "
    };
  },
  async beforeMount() {
    await this.cargarDatos();
  },
  methods: {
    async cargarDatos(){
      this.pisos = await iotController.getCantidadPisos();
    },
    async buscarSensores() {
      this.setTituloTabla();
      let resultAreas = await iotController.getAreaById(this.areaSeleccionada.id);
      this.sensoresInArea = resultAreas.sensores;
    },
    setTituloTabla() {
      if (this.areaSeleccionada != "Área..." && this.pisoSeleccionado != "Piso...") {
        this.tituloTabla = "Tabla de sensores:  " + this.areaSeleccionada.nombre + " - Piso " + (this.pisoSeleccionado == 0 ? "Planta baja" : this.pisoSeleccionado);
      }
    },
    redireccionarSensoresEnTiempoReal(){
      window.open( 'https://www.iot-pp1.click/ui/#!/0?area='+this.areaSeleccionada.nombre.replaceAll(' ','_'), '_blank');
    },
    async obtenerTiposDeSensores(){
      this.tiposSensores = await iotController.formatearTiposDeSensores(await iotController.getTiposDeSensores());
    },
    async seleccionarPiso( piso ){
      this.areaSeleccionada = ""
      this.pisoSeleccionado = piso;
      this.areas = await iotController.getAreasByPiso(this.pisoSeleccionado);
    },
    seleccionarArea(area){
      this.areaSeleccionada = area
    }
  },
};
</script>

<style scoped>

.card{
  border-radius: 0 !important;
  min-height: 80vh;
  max-height: 80vh;
}

#pisoDropdown,
#areaDropdown,
#btnBuscar, #btnTiempoReal, #btnAltaRegistro {
  height: 38px;
  font-size: 15px !important;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  margin-right: 0.5em;
}

.dropdown-toggle::after{
  float: right ;
  margin-top: 10px;
}

.dropdown-item:active{
  background-color: #6fa363;
}

</style>