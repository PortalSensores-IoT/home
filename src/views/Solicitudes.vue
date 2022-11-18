<template>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="cardSolicitudesPendientes-tab" data-bs-toggle="tab"
                data-bs-target="#cardSolicitudesPendientes" type="button" role="tab"
                aria-controls="cardSolicitudesPendientes" aria-selected="true">Pendientes</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="cardSolicitudesCerradas-tab" data-bs-toggle="tab"
                data-bs-target="#cardSolicitudesCerradas" type="button" role="tab" aria-controls="cardSolicitudesCerradas"
                aria-selected="false">Cerradas</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="cardSolicitudesAprobadas-tab" data-bs-toggle="tab"
                data-bs-target="#cardSolicitudesAprobadas" type="button" role="tab" aria-controls="cardSolicitudesAprobadas"
                aria-selected="false">Aprobadas</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="cardSolicitudesRechazadas-tab" data-bs-toggle="tab"
                data-bs-target="#cardSolicitudesRechazadas" type="button" role="tab"
                aria-controls="cardSolicitudesRechazadas" aria-selected="false">Rechazadas</button>
        </li>
    </ul>
    
    <div class="tab-content" id="myTabContent">
        <div id="cardSolicitudesPendientes" class="card tab-pane show active" role="tabpanel"
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
                            <th colspan="2" scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="solicitud in this.solicitudesPendientes" :key="solicitud.id">
                            <th class="p-auto" scope="row">{{ solicitud.id }}</th>
                            <td> {{ solicitud.tipo === "BAJA_SENSOR" ? "Baja de sensor" : 
                                    solicitud.tipo === "ALTA_SENSOR" ? "Alta de sensor" :
                                    "Modificación de sensor" }} </td>
                            <td> {{ solicitud.tipoSensor }} </td>
                            <td> {{ solicitud.nombreArea }} </td>
                            <td> {{ solicitud.fecha }} </td>
                            <td align="center">
                                <button type="button" class="btn btn-outline-success">Ver detalle</button>
                                
                            </td>
                            <td id="solicitudButtons" align="right" v-show="esTecnico">
                                <button @click="aprobarSolicitud(solicitud.id)"><font-awesome-icon id="btnAprobar" icon="fa-solid fa-check"/></button>
                                <button @click="rechazarSolicitud(solicitud.id)"><font-awesome-icon id="btnRechazar" icon="fa-solid fa-skull-crossbones"/></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    
        <div id="cardSolicitudesCerradas" class="card tab-pane" role="tabpanel"
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
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="solicitud in this.solicitudesCerradas" :key="solicitud.id">
                            <th scope="row">{{ solicitud.id }}</th>
                            <td> {{ solicitud.tipo === "BAJA_SENSOR" ? "Baja de sensor" : 
                                    solicitud.tipo === "ALTA_SENSOR" ? "Alta de sensor" :
                                    "Modificación de sensor" }} </td>
                            <td> {{ solicitud.tipoSensor }} </td>
                            <td> {{ solicitud.nombreArea }} </td>
                            <td> {{ solicitud.fecha }} </td>
                            <td align="center">
                                <button type="button" class="btn btn-outline-success">Ver detalle</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    
        <div id="cardSolicitudesRechazadas" class="card tab-pane" role="tabpanel"
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
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="solicitud in this.solicitudesRechazadas" :key="solicitud.id">
                            <th scope="row">{{ solicitud.id }}</th>
                            <td> {{ solicitud.tipo === "BAJA_SENSOR" ? "Baja de sensor" : 
                                    solicitud.tipo === "ALTA_SENSOR" ? "Alta de sensor" :
                                    "Modificación de sensor" }} </td>
                            <td> {{ solicitud.tipoSensor }} </td>
                            <td> {{ solicitud.nombreArea }} </td>
                            <td> {{ solicitud.fecha }} </td>
                            <td align="center">
                                <button type="button" class="btn btn-outline-success">Ver detalle</button>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="cardSolicitudesAprobadas" class="card tab-pane" role="tabpanel"
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
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="solicitud in this.solicitudesAprobadas" :key="solicitud.id">
                            <th scope="row">{{ solicitud.id }}</th>
                            <td> {{ solicitud.tipo === "BAJA_SENSOR" ? "Baja de sensor" : 
                                    solicitud.tipo === "ALTA_SENSOR" ? "Alta de sensor" :
                                    "Modificación de sensor" }} </td>
                            <td> {{ solicitud.tipoSensor }} </td>
                            <td> {{ solicitud.nombreArea }} </td>
                            <td> {{ solicitud.fecha }} </td>
                            <td align="center">
                                <button type="button" class="btn btn-outline-success">Ver detalle</button>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    
    </div>
</template>
<script>
import iotController from '@/middleware/iotController';

export default{
    name: "Solicitudes",
    data(){
        return {
            solicitudesPendientes: [],
            solicitudesCerradas: [],
            solicitudesAprobadas: [],
            solicitudesRechazadas: [],
            esTecnico: false,
        }
    },
    async beforeMount() {
        await this.cargarDatos();
        if(window.sessionStorage.getItem('rol') == 'directivo'){
            this.esTecnico = true;
        }
    },
    methods:{
        async cargarDatos(){
            this.solicitudesPendientes = await iotController.getSolicitudesByEstado("ABIERTA");
            this.solicitudesCerradas = await iotController.getSolicitudesByEstado("CERRADA");
            this.solicitudesAprobadas = await iotController.getSolicitudesByEstado("APROBADA");
            this.solicitudesRechazadas= await iotController.getSolicitudesByEstado("DESAPROBADA");
        },
        async aprobarSolicitud(id){
            iotController.aprobarTicket(id)
            await this.cargarDatos
        },
        async rechazarSolicitud(id){
            iotController.rechazarTicket(id)
            await this.cargarDatos
        }
    }
}
</script>

<style scoped>
    
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


  .btn-outline-success{
    border-color: #6fa363;
    color: #6fa363;
  }

  .btn-outline-success:hover{
    background-color: #6fa363 !important;
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
