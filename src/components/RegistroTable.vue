<template>
  <div id="instanciasTableDiv">
    <table>
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
            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <img v-bind:src="require('../assets/modificar.png')" alt="">
            </button>
            
          </td>
          <td id="imgTacho">
            <button>
              <img v-bind:src="require('../assets/tacho.png')" alt="">
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import registros from "@/registros.json";

export default {
  name: "RegistroTable",
  props: {
    tituloTabla:String
  },
  data() {
    return {
      registros
    };
  },
  methods: {
  }
};
</script>

<style scoped>
#instanciasTableDiv {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 10px 0;
}

table {
  font-family: sans-serif;
  width: 90%;
  border-spacing: 0 !important ;
}

td, th {
  border-color: black;
  border-style: groove;
  border-width: 1px;
}

th {
  font-family: sans-serif;
  margin: 0px auto;
  padding: 10px;
  text-align: left;
  width: 30%;
  background: #1b9752;
  color: white;
  font-weight: 400;
}

td {
  background: none;
  padding-left: 10px;
}

#headTable {
  text-align: center;
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
  background: #1b9752;
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

</style>