<template>
  <!--<div>
    <button id="btnEnviarSugerencia" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAltaSugerencia" v-show="this.autorizaciones['Alta sugerencia']">
      Enviar sugerencia
    </button>
  </div>-->

  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="cardSugerenciasPendientes-tab" data-bs-toggle="tab" data-bs-target="#cardSugerenciasPendientes" type="button" role="tab" aria-controls="cardSugerenciasPendientes" aria-selected="true">Pendientes</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="cardSugerenciasRechazadas-tab" data-bs-toggle="tab" data-bs-target="#cardSugerenciasRechazadas" type="button" role="tab" aria-controls="cardSugerenciasRechazadas" aria-selected="false">Aprobadas</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="cardSugerenciasAprobadas-tab" data-bs-toggle="tab" data-bs-target="#cardSugerenciasAprobadas" type="button" role="tab" aria-controls="cardSugerenciasAprobadas" aria-selected="false">Rechazadas</button>
    </li>
  </ul>

  <div class="tab-content" id="myTabContent">
    <div id="cardSugerenciasPendientes" class="card tab-pane fade show active" role="tabpanel" aria-labelledby="cardSugerenciasPendientes-tab">
      <div id="cardSugerenciasPendientesHeader" class="card-header py-3">
        <b>Sugerencias pendientes</b>
      </div>
      <div class="card-body">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tipo de sugerencia</th>
              <th scope="col">Tipo de sensor</th>
              <th scope="col">Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div id="cardSugerenciasRechazadas" class="card tab-pane fade" role="tabpanel" aria-labelledby="cardSugerenciasRechazadas-tab">
      <div id="cardSugerenciasPendientesHeader" class="card-header py-3">
        <b>Sugerencias rechazadas</b>
      </div>
      <div class="card-body">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tipo de sugerencia</th>
              <th scope="col">Tipo de sensor</th>
              <th scope="col">Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="cardSugerenciasAprobadas" class="card tab-pane fade" role="tabpanel" aria-labelledby="cardSugerenciasAprobadas-tab">
      <div id="cardSugerenciasPendientesHeader" class="card-header py-3">
        <b>Sugerencias aprobadas</b>
      </div>
      <div class="card-body">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tipo de sugerencia</th>
              <th scope="col">Tipo de sensor</th>
              <th scope="col">Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>

  <FormAltaSugerencia/>

</template>

<script>
import iotController from "@/middleware/iotController.js";
import FormAltaSugerencia from "@/components/FormAltaSugerencia.vue";

export default {
  name:"Sugerencias",
  components:{FormAltaSugerencia},
  props:{
    autorizaciones:Object
  },
  created(){
    window.onbeforeunload = function(event) {
        this.$router.push("/");
        event.preventDefault()
      }
      
  },
  data() {
    return {
      pisos: [],
      areas: [],
      pisoSeleccionado: "",
      areaSeleccionada: "",
      tiposSensores: ['Temperatura','Puerta','Humedad','Calidad de Aire','Proximidad','Humo','Gas','Nivel de ruido']
    }
  },
  beforeMount() {
    this.cargarDatos();
  },
  methods:{
    enviarSugerencia: function (event) {
      if (event) {
        event.preventDefault()
      }
    },
    async cargarDatos(){
      this.pisos = await iotController.getCantidadPisos();
    },
    async obtenerAreasPorPiso(){
      this.areas = await iotController.getAreasByPiso(this.pisoSeleccionado)
    }
  }
}
</script>


<style scoped>

  #cardSugerenciasPendientes {
    border-radius: 0% !important;
  }

  #cardSugerenciasPendientesHeader {
    
  }






  #cardSugerencias {
    padding: 0;
    background-color: #DADED3;
    border-radius: 2%;
  }

  form {
    padding: 20px;
  }

  form div label{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  #sugerenciaForm:focus,
  #asuntoForm:focus {
  border-color: #1b9752;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #1b9752;
  }

  #footerBox {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    max-height: 70px !important;
  }

  input:focus, select:focus{
    border-color: #1b9752;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #1b9752;
  }

  #detalleSensor{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
