<template>
  <div id="instanciasTableDiv">
    <table class="table table-striped">
      <thead>
        <tr >
          <th id="headTable" scope="col" colspan="5"><b>{{tituloTabla}}</b></th>
        </tr>
        <tr>
          <th scope="col"><b>Sensor</b></th>
          <th scope="col"><b>Valor</b></th>
          <th scope="col"><b>Unidad de medida</b></th>
          <th scope="col"><b>Fecha</b></th>
          <th scope="col" colspan="2"></th>
        </tr>
      </thead>
      <tbody>
        <tr id="registroRow" v-for="sensor in this.dataTable" :key="sensor.id">
          <td>{{ sensor.tipo }}</td>
          <td>{{ (sensor.registros[sensor.registroslength] != undefined ? sensor.registros[sensor.registroslength].valor : 0) }}</td>
          <td>{{ sensor.unidadDeMedida }}</td>
          <td>{{ (sensor.registros[sensor.registroslength] != undefined ? sensor.registros[sensor.registroslength].fecha : 0) }}</td>
          <td id="imgModificar">
            <button type="button" v-if="this.user.rol === 'directivo'">
              <img v-bind:src="require('../assets/modificar.png')" alt="algo">
            </button>
            
          </td>
          <td id="imgTacho">
            <button v-if="this.user.rol === 'directivo'" data-bs-toggle="modal" data-bs-target="#modalBajaSensor">
              <img v-bind:src="require('../assets/tacho.png')" alt="">
            </button>
          </td>
        </tr>
        <tr id="registroRow" v-for="sensor in this.dataTable" :key="sensor.id">
           <td>{{ sensor.tipo }}</td>
          <td>{{ (sensor.registros[sensor.registroslength] != undefined ? sensor.registros[sensor.registroslength].valor : 0) }}</td>
          <td>{{ sensor.unidadDeMedida }}</td>
          <td>{{ (sensor.registros[sensor.registroslength] != undefined ? sensor.registros[sensor.registroslength].fecha : 0) }}</td>
          <td id="imgModificar">
            <button type="button" v-if="this.user.rol === 'directivo'">
              <img v-bind:src="require('../assets/modificar.png')" alt="algo">
            </button>
            
          </td>
          <td id="imgTacho">
            <button v-if="this.user.rol === 'directivo'" data-bs-toggle="modal" data-bs-target="#modalBajaSensor">
              <img v-bind:src="require('../assets/tacho.png')" alt="">
            </button>
          </td>
        </tr>
        <tr id="registroRow" v-for="registro in registros" :key="registro.id">
          <td>{{ registro.valor }}</td>
          <td>{{ registro.fecha }}</td>
          <td>{{ registro.frecuencia }}</td>
          <td id="imgModificar">
            <button type="button">
              <img v-bind:src="require('../assets/modificar.png')" alt="algo">
            </button>
            
          </td>
          <td id="imgTacho">
            <button  data-bs-toggle="modal" data-bs-target="#modalBajaSensor">
              <img v-bind:src="require('../assets/tacho.png')" alt="">
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!--<table>
      <thead>
        <th id="headTable" colspan="5">{{tituloTabla}}</th>
      </thead>
      <tbody>
        <tr>
          <th>Sensor</th>
          <th>Valor</th>
          <th>Unidad de medida</th>
          <th colspan="2"></th>
        </tr>
        <tr id="registroRow" v-for="registro in registros" :key="registro.id">
          <td>{{ registro.valor }}</td>
          <td>{{ registro.fecha }}</td>
          <td>{{ registro.frecuencia }}</td>
          <td id="imgModificar">
            <button type="button">
              <img v-bind:src="require('../assets/modificar.png')" alt="algo">
            </button>
            
          </td>
          <td id="imgTacho">
            <button>
              <img v-bind:src="require('../assets/tacho.png')" alt="">
            </button>
          </td>
        </tr>
      </tbody>
    </table>-->
  </div>
  <!-- Modal solicitud de baja de sensor-->
  <div class="modal fade" id="modalBajaSensor" tabindex="-1" aria-labelledby="modalBajaSensor" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Solicitud de baja de sensor</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ¿Estás seguro de solicitar la baja del sensor?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "RegistroTable",
  props: {
    tituloTabla:String,
    user:Object,
    dataTable:Object
  },
  data() {
    return {
    };
  },
  methods: {
    getUltimoRegistroSensor(sensor){
      console.log("SENSOR "+sensor);
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
  width: 32px;
  height: 32px;
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