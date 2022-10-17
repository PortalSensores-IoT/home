<template>
  <div id="instanciasTableDiv">
    <table>
      <tr>
        <th>Valor</th>
        <th>Registro</th>
        <th>Frecuencia de registro (en seg.)</th>
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
  background: none;
}

table {
  font-family: sans-serif;
  width: 90%;
  table-layout: fixed;
  background: none;
}


tr {
  background: none;
}

th {
  font-family: sans-serif;
  margin: 0px auto;
  padding: 10px;
  text-align: left;
  width: 33%;
  background: none;
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
  border-style: groove;
  background: none;
}

#registroRow:hover {
  background: #619257;
}
</style>