<template>
  <div id="instanciasTableDiv">
    <table>
      <tr>
        <th>Sensor</th>
        <th>Valor</th>
        <th>Unidad de medida</th>
      </tr>
      <tr id="registroRow" v-for="registro in registros" :key="registro.id">
        <td>{{ registro.valor }}</td>
        <td>{{ registro.fecha }}</td>
        <td>{{ registro.frecuencia }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import registros from "@/registros.json";

export default {
    name:"RegistroTable",
    data() {
        return {
        registros
        };
    }
}
</script>

<style scoped>
#instanciasTableDiv {
  margin-top: 10px;
  display:flex;
  justify-content: center;
  flex-direction: row;
  padding: 10px 0;
}

table {
  font-family: sans-serif;
  width: 90%;
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
  width: 33%;
  background:#1b9752;
  color:white;
  font-weight: 400;
}

td {
  background:none;
  padding: 5px 10px;
  }

#registroRow {
  margin: 0px auto;
  text-align: left;
  width: 33%;
  font-family: consolas;
  font-weight: 400;
}

#registroRow:hover {
  background:#1b9752;
  color: white;
}
</style>