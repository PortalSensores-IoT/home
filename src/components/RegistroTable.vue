<template>
  <div id="instanciasTableDiv">
    <table class="table table-striped">
      <thead>
        <tr >
          <th id="headTable" scope="col" colspan="5"><b>{{tituloTabla}}</b></th>
        </tr>
        <tr>
          <th scope="col"><b>Sensor</b></th>
          <th scope="col"><b>Unidad de medida</b></th>
          <th scope="col"><b>Último valor registrado</b></th>
          <th scope="col"><b>Fecha</b></th>
          <th scope="col" colspan="2"></th>
        </tr>
      </thead>
      <tbody>
        <tr id="registroRow" v-for="sensor in this.sensoresInArea" :key="sensor.id">
          <td>{{ sensor.tipo }}</td>
          <td>{{ sensor.unidadDeMedida }}</td>
          <td>{{this.getUltimoRegistroValor(sensor)}}</td>
          <td>{{ this.getUltimoRegistroFecha(sensor) }}</td>
          <td id="imgModificar">
            <button type="button" data-bs-toggle="modal" data-bs-target="#modalModificaSensor" @click="modificarSensor(sensor)">
              <img v-bind:src="require('../assets/modificar.png')" alt="algo">
            </button>
          </td>
          <td id="imgTacho" v-show="this.autorizaciones['Baja sensor']">
            <button v-if="autorizaciones !== undefined"  data-bs-toggle="modal" data-bs-target="#modalBajaSensor" @click="eliminarSensor(sensor) ">
              <img v-bind:src="require('../assets/tacho.png')" alt="">
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ConfirmarBajaSensor :bajaSensor="this.bajaSensor"/>
  <ConfirmarModificacionSensor :modificaSensor="this.modificaSensor"/>
</template>

<script>
import ConfirmarBajaSensor from "@/components/ConfirmarBajaSensor.vue";
import ConfirmarModificacionSensor from "@/components/ConfirmarModificacionSensor.vue";

export default {

  name: "RegistroTable",
  components:{ConfirmarBajaSensor, ConfirmarModificacionSensor},
  props: {
    tituloTabla:String,
    sensoresInArea:Object,
    autorizaciones:Object,
    areaSeleccionada:Object
  },
  data(){
    return{
      bajaSensor:null,
      modificaSensor:null
  }
  },
  methods:{
    getUltimoRegistroValor(sensor) {
      if(sensor.registros != undefined && sensor.registros != null) {
        let ultimoRegistro = sensor.registros[sensor.registros.length-1];
        return ultimoRegistro === undefined ? '-' : this.getSignoUnidadDeMedida(sensor, ultimoRegistro.valor);
      } else {
        return '-';
      }
    },
    getUltimoRegistroFecha(sensor){
      if(sensor.registros != undefined && sensor.registros != null) {
        let ultimoRegistro = sensor.registros[sensor.registros.length-1];
        return ultimoRegistro === undefined ? '-' : ultimoRegistro.fecha;
      } else {
        return '-';
      }
    },
    getSignoUnidadDeMedida(sensor, valor) {
      switch(sensor.unidadDeMedida) {
        case 'Porcentaje':
          return valor + '%';
        case 'Celcius':
          return valor + '°C';
        case 'Decibeles':
          return valor + 'dB';
        case 'ppm':
          return valor + 'ppm';
        case 'Boolean':
          if(sensor.tipo === 'PUERTA' || sensor.tipo === 'VENTANA'){
            return valor == 1 ? ' Abierta' : ' Cerrada';
          } else {
            return valor == 1 ? ' Activado' : ' Desactivado';
          }
        case undefined:
          return '-';
      }
    },
    eliminarSensor(sensor) {
      let tipo = 'BAJA_SENSOR';
      let tipoSensor = sensor.tipo;
      let area = this.areaSeleccionada.nombre;
      let id = sensor.id;
      this.bajaSensor = {tipo:tipo, tipoSensor:tipoSensor, area:area, descripcion:'', idSensor:id, urls:[]};
    },
    clearSensorBaja(){ 
      this.bajaSensor = null;
    },
    modificarSensor(sensor){
      let tipo = 'MODIFICAR_SENSOR';
      let tipoSensor = sensor.tipo;
      let area = this.areaSeleccionada.nombre;
      let id = sensor.id;
      this.modificaSensor = {tipo:tipo, tipoSensor:tipoSensor, area:area, descripcion:'', idSensor:id, urls:[]};
    },
    clearSensorModificacion(){ 
      this.modificaSensor = null;
    }
  }
};
</script>

<style scoped>
#instanciasTableDiv {
  width: 100%;
  margin-top: 1em;
  margin-bottom: 1em;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: row;
  overflow: auto;
}

table {
  font-family: sans-serif;
  width: 90%;
  border-spacing: 0 !important ;
}

th {
  font-family: sans-serif;
  margin: 0px auto;
  padding: 10px;
  text-align: left;
  width: 30%;
  font-weight: 400;
}

table body{
  display: flex;
  overflow: auto;
  max-height: 90vh !important;
}

td {
  background: none;
  padding-left: 10px;
}

#headTable {
  font-size: 1.5em;
  width: 100%;
  align-content: center;
  align-items: left;
}

#registroRow {
  margin: 0px auto;
  text-align: left;
  width: 33%;
  font-family: consolas;
  font-weight: 400;
  color: black;
}

#registroRow:hover {
  background: #6fa363;
  color: white;
}

img {
  width: 25px;
  height: 25px;
  align-content: center;
}

#imgTacho,
#imgModificar {
  width: 5%;
  max-width: 5%;
  align-items: center;
  padding-left: 0;
}

#imgTacho button,
#imgModificar button{
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: transparent;
  width: 100%;
}

#instanciasTableDiv::-webkit-scrollbar {
    width: 8px;     /* Tamaño del scroll en vertical */
    height: 8px;    /* Tamaño del scroll en horizontal */
    display: none;  /* Ocultar scroll */
}

</style>