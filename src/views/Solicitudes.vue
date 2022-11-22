<template>
    <ul class="nav nav-tabs mt-2" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="cardSolicitudesPendientes-tab" data-bs-toggle="tab"
                data-bs-target="#cardSolicitudesPendientes" type="button" role="tab"
                aria-controls="cardSolicitudesPendientes" aria-selected="true" v-show="autorizaciones.TABLA_SOLICITUDES_PENDIENTES">Pendientes</button>
        </li>
        <li class="nav-item" role="presentation" v-show="false">
            <button class="nav-link" id="cardSolicitudesCerradas-tab" data-bs-toggle="tab"
                data-bs-target="#cardSolicitudesCerradas" type="button" role="tab" aria-controls="cardSolicitudesCerradas"
                aria-selected="false" v-show="autorizaciones.TABLA_SOLICITUDES_CERRADAS">Cerradas</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="cardSolicitudesAprobadas-tab" data-bs-toggle="tab"
                data-bs-target="#cardSolicitudesAprobadas" type="button" role="tab" aria-controls="cardSolicitudesAprobadas"
                aria-selected="false" v-show="autorizaciones.TABLA_SOLICITUDES_ACEPTADAS">Aprobadas</button>
        </li>
        <li class="nav-item" role="presentation" v-show="esTecnico">
            <button class="nav-link" id="cardSolicitudesRechazadas-tab" data-bs-toggle="tab"
                data-bs-target="#cardSolicitudesRechazadas" type="button" role="tab"
                aria-controls="cardSolicitudesRechazadas" aria-selected="false" v-show="autorizaciones.TABLA_SOLICITUDES_RECHAZADAS">Rechazadas</button>
        </li>
    </ul>
    
    <div class="tab-content shadow" id="myTabContent">
        <div id="cardSolicitudesPendientes" class="card tab-pane show active overflow-auto " role="tabpanel"
            aria-labelledby="cardSolicitudesPendientes-tab">
            <div id="cardSolicitudesPendientesHeader" class="card-header py-3">
                <b>Solicitudes pendientes</b>
            </div>
            <div class="card-body">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Tipo de solicitud</th>
                            <th scope="col">Tipo de sensor</th>
                            <th scope="col">Área</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Autor</th>
                            <th colspan="2" scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="solicitud in this.solicitudesPendientes" :key="solicitud.id">
                            <th class="p-auto" scope="row">{{ solicitud.id }}</th>
                            <td> {{ solicitud.tipo === "BAJA_SENSOR" ? "Baja de sensor" : 
                                    solicitud.tipo === "ALTA_SENSOR" ? "Alta de sensor" :
                                    "Modificación de sensor" }} </td>
                            <td> {{ this.formatearString(solicitud.tipoSensor) }} </td>
                            <td> {{ solicitud.nombreArea }} </td>
                            <td> {{ solicitud.fecha }} </td>
                            <td> {{ solicitud.appUsuario.nombre }} </td>
                            <td align="center">
                                <button  
                                    v-show="solicitud.tipo === 'MODIFICAR_SENSOR'"   
                                    @click="verDetalleSolicitud(solicitud)"
                                    type="button" 
                                    class="btn btn-outline-success" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#modalDetalleSolicitud"
                                >
                                    Ver descripción
                                </button>
                            </td>
                            <td id="solicitudButtons" align="right" v-show="esTecnico">
                                <button @click="aprobarSolicitud(solicitud.id)" v-show="autorizaciones.BOTON_ACEPTA_SOLICITUD_SENSOR"><font-awesome-icon id="btnAprobar" icon="fa-solid fa-check"/></button>
                                <button @click="rechazarSolicitud(solicitud.id)" v-show="autorizaciones.BOTON_RECHAZA_SOLICITUD_SENSOR"><font-awesome-icon id="btnRechazar" icon="fa-solid fa-xmark"/></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    
        <div id="cardSolicitudesCerradas" class="card tab-pane overflow-auto " role="tabpanel"
            aria-labelledby="cardSolicitudesCerradas-tab">
            <div class="card-header py-3">
                <b>Solicitudes cerradas</b>
            </div>
            <div class="card-body">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Tipo de solicitud</th>
                            <th scope="col">Tipo de sensor</th>
                            <th scope="col">Área</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Autor</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="solicitud in this.solicitudesCerradas" :key="solicitud.id">
                            <th scope="row">{{ solicitud.id }}</th>
                            <td> {{ solicitud.tipo === "BAJA_SENSOR" ? "Baja de sensor" : 
                                    solicitud.tipo === "ALTA_SENSOR" ? "Alta de sensor" :
                                    "Modificación de sensor" }} </td>
                            <td> {{ this.formatearString(solicitud.tipoSensor) }} </td>
                            <td> {{ solicitud.nombreArea }} </td>
                            <td> {{ solicitud.fecha }} </td>
                            <td> {{ solicitud.appUsuario.nombre }} </td>
                            <td align="center">
                                <button  
                                    v-show="solicitud.tipo === 'MODIFICAR_SENSOR'"   
                                    @click="verDetalleSolicitud(solicitud)"
                                    type="button" 
                                    class="btn btn-outline-success" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#modalDetalleSolicitud"
                                >
                                    Ver descripción
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    
        <div id="cardSolicitudesRechazadas" class="card tab-pane overflow-auto " role="tabpanel"
            aria-labelledby="cardSolicitudesRechazadas-tab">
            <div class="card-header py-3">
                <b>Solicitudes rechazadas</b>
            </div>
            <div class="card-body">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Tipo de solicitud</th>
                            <th scope="col">Tipo de sensor</th>
                            <th scope="col">Área</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Autor</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="solicitud in this.solicitudesRechazadas" :key="solicitud.id">
                            <th scope="row">{{ solicitud.id }}</th>
                            <td> {{ solicitud.tipo === "BAJA_SENSOR" ? "Baja de sensor" : 
                                    solicitud.tipo === "ALTA_SENSOR" ? "Alta de sensor" :
                                    "Modificación de sensor" }} </td>
                            <td> {{ this.formatearString(solicitud.tipoSensor) }} </td>
                            <td> {{ solicitud.nombreArea }} </td>
                            <td> {{ solicitud.fecha }} </td>
                            <td> {{ solicitud.appUsuario.nombre }} </td>
                            <td align="center">
                                <button  
                                    v-show="solicitud.tipo === 'MODIFICAR_SENSOR'"   
                                    @click="verDetalleSolicitud(solicitud)"
                                    type="button" 
                                    class="btn btn-outline-success" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#modalDetalleSolicitud"
                                >
                                    Ver descripción
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="cardSolicitudesAprobadas" class="card tab-pane overflow-auto " role="tabpanel"
            aria-labelledby="cardSolicitudesAprobadas-tab">
            <div class="card-header py-3">
                <b>Solicitudes aprobadas</b>
            </div>
            <div class="card-body">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Tipo de solicitud</th>
                            <th scope="col">Tipo de sensor</th>
                            <th scope="col">Área</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Autor</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="solicitud in this.solicitudesAprobadas" :key="solicitud.id">
                            <th scope="row">{{ solicitud.id }}</th>
                            <td> {{ solicitud.tipo === "BAJA_SENSOR" ? "Baja de sensor" : 
                                    solicitud.tipo === "ALTA_SENSOR" ? "Alta de sensor" :
                                    "Modificación de sensor" }} </td>
                            <td> {{ this.formatearString(solicitud.tipoSensor) }} </td>
                            <td> {{ solicitud.nombreArea }} </td>
                            <td> {{ solicitud.fecha }} </td>
                            <td> {{ solicitud.appUsuario.nombre }} </td>
                            <td align="center">
                                <button  
                                    v-show="solicitud.tipo === 'MODIFICAR_SENSOR'"   
                                    @click="verDetalleSolicitud(solicitud)"
                                    type="button" 
                                    class="btn btn-outline-success" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#modalDetalleSolicitud"
                                >
                                    Ver descripción
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modalDetalleSolicitud" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Detalle solicitud</h5>
          </div>
          <div class="modal-body">
            <h6 class="card-title">Descripción:</h6>
            <p class="card-text">{{ solicitudSeleccionada.descripcion }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import iotController from '@/middleware/iotController';

export default{
    name: "Solicitudes",
    props:{
        autorizaciones:Object
    },
    data(){
        return {
            solicitudes: [],
            solicitudesPendientes: [],
            solicitudesCerradas: [],
            solicitudesAprobadas: [],
            solicitudesRechazadas: [],
            esTecnico: false,
            solicitudSeleccionada: {},
        }
    },
    async beforeMount() {
        if(window.sessionStorage.getItem('rol') == 'directivo'){
            this.esTecnico = true;
        }
        await this.cargarDatos();
    },
    methods:{
        async obtenerSolicitudes(){
            this.solicitudes = await iotController.getSolicitudes();
        },
        async cargarDatos(){
            await this.obtenerSolicitudes()
            
            this.solicitudesPendientes = this.filtrarSolicitudesPorEstado("ABIERTA");
            this.solicitudesCerradas = this.filtrarSolicitudesPorEstado("CERRADA");
            this.solicitudesAprobadas = this.filtrarSolicitudesPorEstado("APROBADA");
            this.solicitudesRechazadas= this.filtrarSolicitudesPorEstado("DESAPROBADA");
        },
        async aprobarSolicitud(id){
            await iotController.aprobarTicket(id).then( response => {
                this.cargarDatos()
            })
        },
        async rechazarSolicitud(id){
            await iotController.rechazarTicket(id).then( response => {
                this.cargarDatos()
            })
        },
        verDetalleSolicitud(solicitud){
            this.solicitudSeleccionada = solicitud;
        },
        filtrarSolicitudesPorEstado(estado){
            let result = this.solicitudes.filter( ticket => ticket.estado == estado);
            return result
        },
        formatearString(string){
            return iotController.formatearString(string);
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
    height: 55px;
  }

  #solicitudButtons button {
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


</style>
