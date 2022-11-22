<template>
  
  <button id="btnEnviarSugerencia" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAltaSugerencia" v-show="this.autorizaciones.BOTON_ALTA_SUGERENCIA">
    Realizar sugerencia
  </button>

  <ul class="nav nav-tabs mt-2" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="cardSugerenciasPendientes-tab" data-bs-toggle="tab" data-bs-target="#cardSugerenciasPendientes" type="button" role="tab" aria-controls="cardSugerenciasPendientes" aria-selected="true" v-show="autorizaciones.TABLA_SUGERENCIAS_PENDIENTES">Pendientes</button>
    </li>
    <li class="nav-item" role="presentation" v-show="false">
      <button class="nav-link" id="cardSugerenciasCerradas-tab" data-bs-toggle="tab" data-bs-target="#cardSugerenciasCerradas" type="button" role="tab" aria-controls="cardSugerenciasCerradas" aria-selected="false" v-show="autorizaciones.TABLA_SUGERENCIAS_CERRADAS">Cerradas</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="cardSugerenciasAprobadas-tab" data-bs-toggle="tab" data-bs-target="#cardSugerenciasAprobadas" type="button" role="tab" aria-controls="cardSugerenciasAprobadas" aria-selected="false" v-show="autorizaciones.TABLA_SUGERENCIAS_ACEPTADAS">Aprobadas</button>
    </li>
    <li class="nav-item" role="presentation" v-show="this.esDirectivo">
      <button class="nav-link" id="cardSugerenciasRechazadas-tab" data-bs-toggle="tab" data-bs-target="#cardSugerenciasRechazadas" type="button" role="tab" aria-controls="cardSugerenciasRechazadas" aria-selected="false" v-show="autorizaciones.TABLA_SUGERENCIAS_RECHAZADAS">Rechazadas</button>
    </li>
  </ul>

  <div class="tab-content shadow" id="myTabContent" >
    <div id="cardSugerenciasPendientes" class="card tab-pane fade show active overflow-auto" role="tabpanel" aria-labelledby="cardSugerenciasPendientes-tab">
      <div id="cardSugerenciasPendientesHeader" class="card-header py-3">
        <b>Sugerencias pendientes</b>
      </div>
      <div class="card-body">
        <table class="table table-striped table-hover">
          <thead>
              <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Tipo de sensor</th>
                  <th scope="col">Área</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Autor</th>
                  <th colspan="2" scope="col"></th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="sugerencia in this.sugerenciasPendientes" :key="sugerencia.id">
                  <th scope="row">{{ sugerencia.id }}</th>
                  <td> {{ this.formatearString(sugerencia.tipoSensor) }} </td>
                  <td> {{ sugerencia.nombreArea }} </td>
                  <td> {{ sugerencia.fecha }} </td>
                  <td> {{ sugerencia.appUsuario.nombre }} </td>
                  <td align="center">
                    <button 
                      @click="verDetalleSugerencia(sugerencia)"
                      type="button" 
                      class="btn btn-outline-success" 
                      data-bs-toggle="modal" 
                      data-bs-target="#modalDetalleSugerencia"
                    >
                      Ver detalle
                    </button>
                  </td>
                  <td id="sugerenciaButtons" align="right" v-show="esDirectivo ">
                      <button @click="aprobarSugerencia(sugerencia.id)" v-show="autorizaciones.BOTON_ACEPTA_SUGERENCIA && !esAutorDeLaSugerencia(sugerencia.appUsuario.email)"><font-awesome-icon id="btnAprobar" icon="fa-solid fa-check"/></button>
                      <button @click="rechazarSugerencia(sugerencia.id)" v-show="autorizaciones.BOTON_RECHAZO_SUGERENCIA && !esAutorDeLaSugerencia(sugerencia.appUsuario.email)"><font-awesome-icon id="btnRechazar" icon="fa-solid fa-xmark"/></button>
                  </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div id="cardSugerenciasCerradas" class="card tab-pane fade overflow-auto" role="tabpanel" aria-labelledby="cardSugerenciasCerradas-tab">
      <div class="card-header py-3">
        <b>Sugerencias cerradas</b>
      </div>
      <div class="card-body">
        <table class="table table-striped table-hover">
          <thead>
              <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Tipo de sensor</th>
                  <th scope="col">Área</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Autor</th>
                  <th scope="col"></th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="sugerencia in this.sugerenciasCerradas" :key="sugerencia.id">
                  <th scope="row">{{ sugerencia.id }}</th>
                  <td> {{ this.formatearString(sugerencia.tipoSensor) }} </td>
                  <td> {{ sugerencia.nombreArea }} </td>
                  <td> {{ sugerencia.fecha }} </td>
                  <td> {{ sugerencia.appUsuario.nombre }} </td>
                  <td align="center">
                    <button 
                      @click="verDetalleSugerencia(sugerencia)"
                      type="button" 
                      class="btn btn-outline-success" 
                      data-bs-toggle="modal" 
                      data-bs-target="#modalDetalleSugerencia"
                    >
                      Ver detalle
                    </button>
                  </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div id="cardSugerenciasRechazadas" class="card tab-pane fade overflow-auto" role="tabpanel" aria-labelledby="cardSugerenciasRechazadas-tab">
      <div class="card-header py-3">
        <b>Sugerencias rechazadas</b>
      </div>
      <div class="card-body">
        <table class="table table-striped table-hover">
          <thead>
              <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Tipo de sensor</th>
                  <th scope="col">Área</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Autor</th>
                  <th scope="col"></th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="sugerencia in this.sugerenciasRechazadas" :key="sugerencia.id">
                  <th scope="row">{{ sugerencia.id }}</th>
                  <td> {{ this.formatearString(sugerencia.tipoSensor) }} </td>
                  <td> {{ sugerencia.nombreArea }} </td>
                  <td> {{ sugerencia.fecha }} </td>
                  <td> {{ sugerencia.appUsuario.nombre }} </td>
                  <td align="center">
                    <button 
                      @click="verDetalleSugerencia(sugerencia)"
                      type="button" 
                      class="btn btn-outline-success" 
                      data-bs-toggle="modal" 
                      data-bs-target="#modalDetalleSugerencia"
                    >
                      Ver detalle
                    </button>
                  </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="cardSugerenciasAprobadas" class="card tab-pane fade overflow-auto" role="tabpanel" aria-labelledby="cardSugerenciasAprobadas-tab">
      <div class="card-header py-3">
        <b>Sugerencias aprobadas</b>
      </div>
      <div class="card-body">
        <table class="table table-striped table-hover">
          <thead>
              <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Tipo de sensor</th>
                  <th scope="col">Área</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Autor</th>
                  <th scope="col"></th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="sugerencia in this.sugerenciasAprobadas" :key="sugerencia.id">
                  <th scope="row">{{ sugerencia.id }}</th>
                  <td> {{ this.formatearString(sugerencia.tipoSensor) }} </td>
                  <td> {{ sugerencia.nombreArea }} </td>
                  <td> {{ sugerencia.fecha }} </td>
                  <td> {{ sugerencia.appUsuario.nombre }} </td>
                  <td align="center">
                    <button 
                      @click="verDetalleSugerencia(sugerencia)"
                      type="button" 
                      class="btn btn-outline-success" 
                      data-bs-toggle="modal" 
                      data-bs-target="#modalDetalleSugerencia"
                    >
                      Ver detalle
                    </button>
                  </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>

  


  <FormAltaSugerencia/>

  <!-- Button trigger modal -->


    <!-- Modal -->
    <div class="modal fade" id="modalDetalleSugerencia" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Detalle sugerencia</h5>
          </div>
          <div class="modal-body">
            <h6 class="card-title">Descripción:</h6>
            <p class="card-text">{{ sugerenciaSeleccionada.descripcion }}</p>

            <iframe
              height="400"
              width="568"
              :src="sugerenciaSeleccionada.urls[0]"
            >

            </iframe>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
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
  data() {
    return {
      pisos: [],
      areas: [],
      pisoSeleccionado: "",
      areaSeleccionada: "",
      tiposSensores: ['Temperatura','Puerta','Humedad','Calidad de Aire','Proximidad','Humo','Gas','Nivel de ruido'],
      sugerenciasPendientes: [],
      sugerenciasCerradas: [],
      sugerenciasAprobadas: [],
      sugerenciasRechazadas: [],
      sugerenciaSeleccionada: { urls: [ "" ]},
      esDirectivo: false,
    }
  },
  async beforeMount() {
    this.cargarDatos();

    if(window.sessionStorage.getItem('rol') == 'directivo'){
            this.esDirectivo = true;
        }
  },
  methods:{
    enviarSugerencia: function (event) {
      if (event) {
        event.preventDefault()
      }
    },
    async cargarDatos(){
      this.pisos = await iotController.getCantidadPisos();

      this.sugerenciasPendientes = await iotController.getSugerenciasByEstado("ABIERTA");
      this.sugerenciasCerradas = await iotController.getSugerenciasByEstado("CERRADA");
      this.sugerenciasAprobadas = await iotController.getSugerenciasByEstado("APROBADA");
      this.sugerenciasRechazadas= await iotController.getSugerenciasByEstado("DESAPROBADA");
    },
    async obtenerAreasPorPiso(){
      this.areas = await iotController.getAreasByPiso(this.pisoSeleccionado)
    },
    async aprobarSugerencia(id){
        await iotController.aprobarTicket(id).then( response => {
          this.cargarDatos()
        })
    },
    async rechazarSugerencia(id){
        await iotController.rechazarTicket(id).then( response => {
          this.cargarDatos()
        })
    },
    verDetalleSugerencia(sugerencia){
      this.sugerenciaSeleccionada = sugerencia
        setTimeout(function() {
      }, 1000)
    },
    formatearString(string){
      return iotController.formatearString(string);
    },
    esAutorDeLaSugerencia(mailDelAutor){
      return window.sessionStorage.email === mailDelAutor;
    }
  }
}
</script>


<style scoped>

  .card {
    min-height: 75vh;
    max-height: 75vh;
  }

  #myTabContent div {
    border-radius: 0% !important;
  }

  #myTab li{
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.174);
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
    margin-bottom: -2px !important;
    padding: 0;
  }

  .nav-tabs .nav-link{
    border: none;
    color: #000 !important;
  }

  .nav-tabs .nav-link.active{
    background-color: rgba(132, 131, 131, 0.137);
    font-weight: bold;
  }

  tr th, tr td{
    vertical-align: middle;
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

  #btnEnviarSugerencia{
    float: right;
  }



  #sugerenciaButtons button {
     border: none;
     background-color: transparent;
  }

  #btnAprobar, #btnRechazar,
  #btnAprobar:hover, #btnRechazar:hover{
    background-color: transparent;
    width: 20px;
    height: 20px;
    
    margin-right: 0.75rem;  
  }

  #btnAprobar{
    color: #6fa363;
  }

  #btnRechazar{
    color: #a22a2a;
  }

  .modal-dialog{
    max-width: 600px !important;
  }

  #myTabContent::-webkit-scrollbar {
    width: 8px;     /* Tamaño del scroll en vertical */
    height: 8px;    /* Tamaño del scroll en horizontal */
    display: none;  /* Ocultar scroll */  
}


</style>
