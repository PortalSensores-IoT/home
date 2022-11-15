<template>
  <div class="modal fade" id="modalAltaSensor" tabindex="-1" aria-labelledby="modalAltaSensor" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Solicitud de alta de sensor</h5>
        </div>
        <div class="modal-body p-0 pt-2">
        <form class="column" @submit.prevent="limpiarForm()">
          <!--<div class="form-group mb-3 col-8">
            <label for="validationDefault03" class="form-label">Unidad de medida</label>
            <input v-model="unidadSeleccionada" type="text" class="col-8 form-control" id="validationDefault03" required>
          </div>-->
          <div class="mb-3 col-8">
            <label for="validationDefault04" class="form-label">Tipo de sensor</label>
            <select v-model="tipoSeleccionado" class="form-select" id="validationDefault04" required>
              <option id="selectPisoPlaceholder" selected hidden>{{tipoSeleccionado}}</option>
              <option v-for="tipo in tiposSensores" :key="tipo" :value="tipo.descripcion"> {{ tipo.descripcion }} </option>
            </select>
          </div>
          <div class="mb-3 col-8">
            <label for="validationDefault05" class="form-label">Piso</label>
            <select 
              @change="obtenerAreasPorPiso()" 
              v-model="pisoSeleccionado" 
              class="form-select" 
              id="validationDefault04" 
              required
            >
              <option id="selectPisoPlaceholder" selected hidden>{{pisoSeleccionado}}</option>
              <option v-for="piso in pisos" :key="piso" :value="piso">{{piso === 0 ? 'Planta baja' : piso}}</option>
            </select>
          </div>
          <div class="mb-3 col-8">
            <label for="validationDefault05" class="form-label">Área</label>
            <select v-model="areaSeleccionada" class="form-select" id="validationDefault04" required>
              <option id="selectAreaPlaceholder" selected hidden>{{areaSeleccionada}}</option>
              <option v-for="area in areasCombobox" :key="area" :value="area">{{area[1]}}</option>
            </select>
          </div>
          <div id="buttonsForms" class="col-12 modal-footer">
            <button id="btnEnviarSolicitud"  class="btn btn-success  btn-sm" type="submit" data-bs-dismiss="modal" @click="enviarSolicitudAltaSensor()" data-bs-toggle="modal" data-bs-target="#modalConfirmaAltaSensor">Enviar solicitud</button>
            <button id="btnCancelarSolicitud" class="btn btn-outline-danger btn-sm" data-bs-dismiss="modal" @click="limpiarForm()">Cancelar</button>
          </div>
        </form>
        </div>
      </div>
    </div>
  </div>
   <div class="modal fade" id="modalConfirmaAltaSensor" tabindex="-1" aria-labelledby="modalConfirmaAltaSensor" aria-hidden="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Solicitando alta de sensor
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="spinner-border text-success" role="status" v-if="this.muestraSpinner">
            <span class="sr-only">iot</span>
          </div>
          <div class="" role="status" v-else>
          {{this.textoConfirmacionBaja}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import iotController from '@/middleware/iotController';


export default {
  name: "FormAltaSensor",
  props: {
    tiposSensores:Object,
    pisos:Object
    },
  data() {
    return {
      areasCombobox:[],
      unidadSeleccionada: "",
      tipoSeleccionado: "Seleccionar tipo...",
      pisoSeleccionado: "Seleccionar piso...",
      areaSeleccionada: "Seleccionar área...",
      muestraSpinner:true
    };
  },
  async beforeMount() {
    //await this.cargarDatos();

  },
  methods:{
    cerrarForm(){
    },
    limpiarForm(){
      this.pisoSeleccionado = "Seleccionar piso...";
      this.areaSeleccionada = "Seleccionar área...";
      this.tipoSeleccionado = "Seleccionar tipo...";
      this.unidadSeleccionada = ""
    },
    /*async cargarDatos(){
      this.pisos = await iotController.getCantidadPisos();
    },*/
    async obtenerAreasPorPiso(){
      this.areasCombobox = await iotController.getAreasByPiso(this.pisoSeleccionado)
    },
    async enviarSolicitudAltaSensor() {
      let tipo = 'ALTA_SENSOR';
      let tipoSensor = this.tipoSeleccionado;
      let area = this.areaSeleccionada
      this.altaSensor = {tipo:tipo, tipoSensor:tipoSensor, area:area, descripcion:'', idSensor:'', urls:[]};
       let result = await iotController.crearTicketSensor(this.altaSensor);
      this.muestraSpinner = false;
      if(result !== undefined && result !== '') {
        this.textoConfirmacionBaja = "Solicitud de alta de sensor enviado con exito!";
      } else {
        this.textoConfirmacionBaja = "Falló el envio de la solicitud";
      }
    }
  }
};
</script>

<style scoped>
  #buttonsForms{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  form{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  form div{
    display: flex;
    flex-direction: column;
    text-align: start;
  }

  #btnEnviarSolicitud{
    margin-right: 15px;
  }

  input:focus, select:focus{
    border-color: #1b9752;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #1b9752;
  }
  
</style>