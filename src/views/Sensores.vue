<template>
  <div id="sensoresDiv">
    <table>
      <tr>
        <th>Area</th>
        <th>Tipo</th>
        <th>Piso</th>
        <th>Frecuencia de registro (en seg.)</th>
      </tr>
      <tr id="instanciaRow" v-for="instancia in instancias" :key="instancia.id">
          <td>{{ instancia.nombre }}</td>
          <td>{{ instancia.tipo }}</td>
          <td>{{ instancia.piso }}</td>
          <td>{{ instancia.frecuenciaRegistro }}</td>
          <td>
            <icon></icon>
            <icon></icon>
          </td>
     </tr>
    </table>
  </div>
</template>

<script>
import instancias from "@/instancias.json";
import Instancia from "@/components/Instancia.vue";

export default {
  name: "Sensores",
  components: { Instancia },
  data() {
    return {
      instancias,
    };
  },
};
</script>

<style>

#sensoresDiv {
    display:flex;
    justify-content: center;
    flex-direction: row;
    align-content: center;
}

table {
    font-family: consolas;
    border-collapse: collapse;
    width: 90%;
    table-layout: fixed;
}

td, th {
    margin: 0px auto;
    text-align: left;
    padding: 8px;
    width: 25%;
    border: 1px solid #000000;
    background-color: #00000000;
}

#instanciaRow:hover {
    background-color: #619257;
}

</style>