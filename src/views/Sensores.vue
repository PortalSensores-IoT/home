<template>
  <div id="sensoresSectionDiv">
    <div id="barraBusquedaDiv">
      <div id="selectorGroupPiso">
        <select @change="filtrarLugaresPorPiso(pisoSeleccionado)" v-model="pisoSeleccionado" id="comboBoxPiso">
          <option disabled hidden selected>Piso</option>
          <option v-for="piso in pisos" :key="piso.id" :value="piso">
            {{ piso == 0 ? "Planta baja" : piso }}
          </option>
        </select>
      </div>
      <div id="selectorGroupLugar">
        <select id="comboBoxLugar">
          <option hidden selected>Área</option>
          <option v-for="lugar in lugares" :key="lugar.id" :value="lugar">
            {{ lugar }}
          </option>
        </select>
      </div>
      <div id="btnBusquedaContainer">
        <button @click="buscar()" id="btnBuscar">Buscar</button>
      </div>
    </div>
    <div id="btnAltaContainer">
      <button id="btnAgregar">Solicitar alta sensor</button>
    </div>
  </div>
  <registroTable :pisoSeleccionado="pisoSeleccionado" :lugarSeleccionado="lugarSeleccionado"/>
</template>

<script>
import RegistroTable from "@/components/RegistroTable.vue";
import areas from "@/areas.json";

export default {
  name: "Sensores",
  components: { RegistroTable },
  data() {
    return {
      areas,
      pisos: [],
      lugares: [],
      pisoSeleccionado: -1,
    };
  },
  beforeMount() {
    this.filtrarPisosYLugares();
  },
  methods: {
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
    },
    buscar() {},
  },
};
</script>

<style scoped>
#sensoresSectionDiv {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  margin-top: 2%;
  width: 90%;
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
  height: 35px;
  text-align: center;
  background: #1b9752;
  color: #ffffff;
  border: none;
  border-radius: 2px;
  outline: none !important;
  font-size: 15px !important;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}

#btnBuscar,
#btnAgregar {
  background: #1b9752;
  color: white;
  border-style: none;
  border-radius: 2px;
  width: auto;
  min-width: 160px;
  height: 35px;
}

#btnBuscar:hover,
#btnAgregar:hover {
  background: #044a23;
  color: white;
}

</style>