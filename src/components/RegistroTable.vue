<template>
  <div id="instanciasTableDiv">
    <table>
      <tr id="headTable"><th>{{lugarSeleccionado}} - Piso {{pisoSeleccionado}}</th></tr>
      <tr>
        <th>Sensor</th>
        <th>Valor</th>
        <th>Unidad de medida</th>
      </tr>
      <tr id="registroRow" v-for="registro in registros" :key="registro.id">
        <td>{{ registro.valor }}</td>
        <td>{{ registro.fecha }}</td>
        <td>{{ registro.frecuencia }}</td>
        <td id="imgModificar"><img src="../assets/modificar.png" /></td>
        <td id="imgTacho"><img src="../assets/tacho.png" /></td>
      </tr>
    </table>
  </div>
</template>

<script>
import registros from "@/registros.json";

export default {
  name: "RegistroTable",
  props: {
    lugarSeleccionado:String,
    pisoSeleccionado:Number
  },
  data() {
    return {
      registros
    };
  },
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
}

td,
th {
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
  background: #1b9752;
  color: white;
  font-weight: 400;
}

td {
  background: none;
  padding: 5px 10px;
}

#headTable {
  width: 100%;
  background: #1b9752;
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
  margin: 10px;
  width: 32px;
  height: 32px;
  align-content: center;
  border-image-width: 0;
  background: none;
}

#imgModificar {
  height: 3vh;
  margin-top: 2%;
  background: none;
}

#imgTacho {
  margin-top: 2%;
  background: none;
}
</style>