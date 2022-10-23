<template>
  <dialog id="dialogForm" open>
    <label>Tipo de sensor</label>
    <select v-model="tipoSensorSeleccionado" id="comboBoxTipoSensor">
          <option v-for="tipoSensor in tiposSensores" :key="tipoSensor" :value="tipoSensor">
            {{ tipoSensor }}
          </option>
        </select>
    <label>Unidad de medida</label>
    <input type="text">
    <label>Lugar</label>
   <select v-model="lugarSeleccionado" id="comboBoxLugar">
          <option v-for="lugar in lugares" :key="lugar.id" :value="lugar"> {{ lugar }} </option>
        </select>
   <button id="btnCerrarForm" >Enviar solicitud</button>
   <button id="btnCerrarForm" @click="cerrarForm()">Cancelar</button>
</dialog>
</template>

<script>

export default {
  name: "FormAltaSensor",
  props: {
    },
  data() {
    return {
      tiposSensores: ['Temperatura','Puerta','Humedad','Calidad de Aire','Proximidad','Humo','Gas','Nivel de ruido'],
      lugares: ['Aula 1', 'Aula 2', 'Aula 3', 'Aula 4', 'Aula 5'],
      lugarSeleccionado: "",
      tipoSensorSeleccionado: ""
      };
  },
  methods:{
    cerrarForm(){
      this.limpiarForm();
    },
    limpiarForm(){
      this.$emit('ocultarForm', false);
    }
  }
};
</script>

<style scoped>

  #dialogForm {
    position: absolute;
    top: 40%;
    left: 40%;
    padding: 20px;
display: flex;
flex-direction: column;
  background: #1b9752;
  border-radius: 2px;
}
</style>