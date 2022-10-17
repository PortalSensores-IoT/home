<template>
  <div id="sensoresSectionDiv">
    <div id="barraBusquedaId">
      <div id="selectorGroupPiso">
        <h4>Piso</h4>
        <select id="comboBoxPiso">
          <option v-for="piso in pisos" :key="piso.id" value="{{piso}}">
            {{ piso }}
          </option>
        </select>
      </div>
      <div id="selectorGroupLugar">
        <h4>Lugar</h4>
        <select id="comboBoxLugar">
          <option v-for="lugar in lugares" :key="lugar.id" value="{{lugar}}">
            {{ lugar }}
          </option>
        </select>
      </div>
      <button id="btnBuscar">Buscar</button>
    </div>
    <registroTable />
  </div>
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
        if (!this.lugares.includes(area.nombre)) {
          this.lugares.push(area.nombre);
        }
      });
      this.pisos.sort();
      this.lugares.sort();
    },
  },
};
</script>

<style scoped>
* {
  background: #963535;
}

#sensoresSectionDiv {
  margin-top: 2%;
}

#comboBoxPiso {
  width: 10%;
  margin: 20px;
}

#comboBoxLugar {
  width: 10%;
  margin: 20px;
}

#btnBuscar {
  background: #1b9752;
  color: white;
  border-style: none;
  border-radius: 2px;
  width: 10%;
  margin: 20px;
}

#btnBuscar:hover {
  background: #044a23;
  color: white;
}
</style>