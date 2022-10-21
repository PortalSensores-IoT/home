<template>
  <div id="sensoresSectionDiv">
    <div id="barraBusquedaDiv">
      <div id="selectorGroupPiso">
        <h4>Piso</h4>
        <select @change="filtrarLugaresPorPiso(pisoSeleccionado)" v-model="pisoSeleccionado" id="comboBoxPiso">
          <option v-for="piso in pisos" :key="piso.id" :value="piso">
            {{ piso == 0 ? "Planta baja" : piso }}
          </option>
        </select>
      </div>
      <div id="selectorGroupLugar">
        <h4>Lugar</h4>
        <select id="comboBoxLugar">
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
      <button id="btnAgregar">Agregar</button>
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
  margin-top: 2%;
}

#barraBusquedaDiv {
  display: flex;
  justify-content: left;
  margin: 0 4%;
}

#selectorGroupPiso {
  margin: 0 10px;
}

#selectorGroupPiso h4 {
  background: none;
  margin: 0 10px;
  font: 1.5em "Segoe UI", "Century Gothic";
}

#selectorGroupLugar {
  margin: 0 10px;
}

#selectorGroupLugar h4 {
  background: none;
  margin: 0 10px;
  font: 1.5em "Segoe UI", "Century Gothic";
}

#comboBoxPiso,
#comboBoxLugar {
  width: 100px;
  height: 30px;
  margin: 10px;
  background: #1b9752;
  color: #ffffff;
  border: none;
  border-radius: 2px;
  box-sizing: border-box !important;
  box-shadow: none !important;
  outline: none !important;
  font-size: 15px !important;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}

#comboBoxLugar {
  width: 200px;
}

#btnBuscar,
#btnAgregar {
  background: #1b9752;
  color: white;
  border-style: none;
  border-radius: 2px;
  width: 100px;
  height: 40px;
  margin: 32px 20px 10px 10px;
}

#btnBuscar:hover,
#btnAgregar:hover {
  background: #044a23;
  color: white;
}

</style>