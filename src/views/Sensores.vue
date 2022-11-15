<template>
  <div id="sensoresContainer" class="shadow col-11 col-md-9">
    <div id="barraBusquedaContainer">
      <div id="barraBusquedaDiv">
        <div id="selectorGroupPiso">
          <select
            @change="filtrarLugaresPorPiso(pisoSeleccionado)"
            v-model="pisoSeleccionado"
            id="comboBoxPiso"
            class="btn btn-success form select"
            placeholder="Seleccionar Piso"
          >
            <option id="selectPisoPlaceholder" selected hidden>{{pisoSeleccionado}}</option>
            <option
              v-for="piso in pisos"
              :key="piso.piso"
              :value="piso"
              :selected="piso == '0'"
            >
              {{ piso == 0 ? "Planta baja" : piso }}
            </option>
          </select>
        </div>
        <div id="selectorGroupLugar">
          <select v-model="areaSeleccionada" id="comboBoxLugar" class="btn btn-success">
            <option id="selectLugarPlaceholder" selected hidden>{{areaSeleccionada}}</option>
            <option v-for="area in areasCombox" :key="area.id" :value="area">
              {{ area.nombre }}
            </option>
          </select>
        </div>
        <div id="btnBusquedaContainer">
          <button 
            id="btnBuscar" 
            :disabled="this.areaSeleccionada === 'Área...' || this.areaSeleccionada === null" 
            class="btn btn-success" 
            @click="buscarSensores()"
          >
            Buscar
          </button>
        </div>
        <div id="btnBusquedaContainer">
          <button 
            id="btnBuscar"
            :disabled="this.areaSeleccionada === 'Área...' || this.areaSeleccionada === null" 
            class="btn btn-success" 
            @click="redireccionarSensoresEnTiempoReal()"
          >
            Ver en tiempo real
          </button>
        </div>
      </div>
      <div id="btnAltaContainer">
        <button id="btnAgregar" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAltaSensor" @click="obtenerTiposDeSensores()" v-show="this.autorizaciones['Alta sensor']">
          Solicitar alta sensor
        </button>
      </div>
      <FormAltaSensor :tiposSensores="tiposSensores" :pisos="pisos"/>
    </div>
    <registroTable :tituloTabla="tituloTabla" :sensoresInArea="sensoresInArea" :autorizaciones="autorizaciones"/>
  </div>

  <!-- Footer -->
  <footer id="footerBox" class="col-12 text-center text-lg-start bg-light text-muted">
    <!-- Copyright -->
    <div class="col-12 p-3" style="background-color: #DADED3;">
      © 2022 Copyright: IoTeam
    </div>
    <!-- Copyright -->
  </footer>
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
      pisoSeleccionado: "Piso...",
      areaSeleccionada: "Área...",
      sensoresInArea: null,
      tituloTabla: "Tabla de sensores "
    };
  },
  async beforeMount() {
    await this.cargarDatos();
  },
  methods: {
    filtrarLugaresPorPiso(pisoSeleccionado) {
      this.areasCombox = [];
      for(let i = 0 ; i < this.areas.length ; i++){
        let area = this.areas[i];
        if (area.piso == pisoSeleccionado) {
          if (!this.areasCombox.includes(area.nombre)) {
            this.areasCombox.push(area);
          }
        }
      }
      this.areasCombox.sort();
      this.areaSeleccionada = "Área...";
    },
    async cargarDatos(){
      this.areas = await iotController.getAreas();
      console.log(this.areas)
      this.pisos = await iotController.getCantidadPisos();
      console.log(this.pisos)
    },
    async buscarSensores() {
      this.setTituloTabla();
      let resultAreas = await iotController.getAreaById(this.areaSeleccionada.id);
      this.sensoresInArea = resultAreas.sensores;
    },
    setTituloTabla() {
      if (this.areaSeleccionada != "Área..." && this.pisoSeleccionado != "Piso...") {
        this.tituloTabla = "Tabla de sensores  " + this.areaSeleccionada.nombre + " - Piso: " + (this.pisoSeleccionado == 0 ? "Planta baja" : this.pisoSeleccionado);
      }
    },
    redireccionarSensoresEnTiempoReal(){
      window.open( 'https://www.iot-pp1.click/ui/#!/0?area='+this.areaSeleccionada.nombre.replaceAll(' ','_'), '_blank');
    },
    async obtenerTiposDeSensores(){
      this.tiposSensores = await iotController.formatearTiposDeSensores(await iotController.getTiposDeSensores());
    }
  },
};
</script>

<style scoped>
#sensoresContainer{
  display: flex;
  flex-direction: column;
  background-color: #DADED3;
  margin: 0 auto;
  height: calc(90% - 80px);
  border-radius: 2% !important;
}

#barraBusquedaContainer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
  height: auto;
  background-color: transparent;
  margin: 0;
}

#barraBusquedaDiv {
  display: flex;
  width: auto;
  text-align: center;
  justify-content: space-between;
}

#comboBoxPiso,
#comboBoxLugar {
  width: 160px;
  height: 38px;
  font-size: 15px !important;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  margin-right: 0.5em;
}

#btnBuscar{
  margin-right: .5em;
}

#btnBuscar,
#btnAgregar {
  width: auto;
  min-width: 160px;
}

#footerBox {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  max-height: 70px !important;
}

@media screen and (max-width: 1200px) {
  #barraBusquedaContainer{
    flex-direction: column;
    justify-content: flex-end;
    align-items: normal;
  }

  #btnAltaContainer{
    display: flex;
    width: 100%;
    margin-top: .5em;
  }
  
  #btnAgregar{
    margin: auto 0.5em auto auto;
    
  }
}

</style>