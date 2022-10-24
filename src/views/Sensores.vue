<template>
  <div id="sensoresContainer" class="shadow rounded">
    <div id="barraBusquedaContainer" class="rounded">
      <div id="barraBusquedaDiv">
        <div id="selectorGroupPiso">
          <select
            @change="filtrarLugaresPorPiso(pisoSeleccionado)"
            v-model="pisoSeleccionado"
            id="comboBoxPiso"
            class="btn btn-success form select"
            placeholder="Seleccionar Piso"
          >
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
          <select v-model="lugarSeleccionado" id="comboBoxLugar" class="btn btn-success">
            <option v-for="lugar in lugares" :key="lugar.id" :value="lugar">
              {{ lugar }}
            </option>
          </select>
        </div>
        <div id="btnBusquedaContainer">
          <button id="btnBuscar" class="btn btn-success" @click="buscarSensores()">Buscar</button>
        </div>
      </div>
      <div id="btnAltaContainer">
        <button id="btnAgregar" class="btn btn-success" @click="showModalAltaSensor = true">
          Solicitar alta sensor
        </button>
      </div>
      <FormAltaSensor v-show="showModalAltaSensor" @ocultarForm="ocultarFormAltaSensor($event)"/>
    </div>
    <registroTable :tituloTabla="tituloTabla" />
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
import areas from "@/areas.json";

export default {
  name: "Sensores",
  components: { RegistroTable, FormAltaSensor },
  props:{
    user:Object
  },
  data() {
    return {
      areas,
      pisos: [],
      lugares: [],
      pisoSeleccionado: -1,
      lugarSeleccionado: "",
      tituloTabla: "Tabla de sensores ",
      showModalAltaSensor: false,
    };
  },
  beforeMount() {
    this.filtrarPisosYLugares();
    this.autenticarUser();
  },
  methods: {
    autenticarUser() {
      if(!this.user.autorizado) {
        window.location.href = "https://www.inkdesign.com.ar";
      }
    },
    filtrarPisosYLugares() {
      this.areas.forEach((area) => {
        if (!this.pisos.includes(area.piso)) {
          this.pisos.push(area.piso);
        }
      });
      this.pisos.sort();
    },
    filtrarLugaresPorPiso(pisoSeleccionado) {
      this.lugares = [];
      this.areas.forEach((area) => {
        if (area.piso == pisoSeleccionado) {
          if (!this.lugares.includes(area.nombre)) {
            this.lugares.push(area.nombre);
          }
        }
      });
      this.lugares.sort();
      this.lugarSeleccionado = "";
    },
    buscarSensores() {
      this.setTituloTabla();
    },
    setTituloTabla() {
      if (this.lugarSeleccionado != "" && this.pisoSeleccionado != -1) {
        this.tituloTabla = "Tabla de sensores  " + this.lugarSeleccionado + " - Piso: " + (this.pisoSeleccionado == 0 ? "Planta baja" : this.pisoSeleccionado);
      }
    },
    ocultarFormAltaSensor(ocultarFormAltaSensor) {
      this.showModalAltaSensor = ocultarFormAltaSensor;
    }
  },
};
</script>

<style scoped>
#sensoresContainer{
  display: flex;
  flex-direction: column;
  width: 90%;
  background-color: #DADED3;
  margin: 0 auto;
  height: calc(90% - 80px);

}

#barraBusquedaContainer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  padding: 10px 20px;
  width: 100%;
  height: auto;
  background-color: #DADED3;
  margin: 0;
}

#barraBusquedaDiv {
  display: flex;
  width: 500px;
  text-align: center;
  justify-content: space-between;
}

#comboBoxPiso,
#comboBoxLugar {
  width: 160px;
  height: 38px;
  font-size: 15px !important;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
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
</style>