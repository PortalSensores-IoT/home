<template>
  <div id="cardSugerencias" class=" container card border-success col-11 col-md-9  py-20  shadow" style="border-radius: 2%;">
    <h3 class="card-header card-title">¡Envianos tus sugerencias!</h3>
    <form class="mx-30">
      
      <div class=" mb-4 col-7 col-md-4">
        <label for="asuntoForm" class="text-left  form-label">Asunto</label>
        <input type="text" class="form-control" id="asuntoForm" placeholder="p. ej.: Nuevo tipo de sensor" required>
      </div>


      <div id="detalleSensor">
        <div class="mb-3 col-3">
          <label for="validationDefault05" class="form-label">Piso</label>
          <select 
            @change="obtenerAreasPorPiso()" 
            v-model="pisoSeleccionado" 
            class="form-select" 
            id="validationDefault04" 
            required
          >
            <option selected value="">Seleccionar...</option>
            <option v-for="piso in pisos" :key="piso" :value="piso">{{piso}}</option>
          </select>
        </div>
        <div class="mb-3 col-3">
          <label for="validationDefault05" class="form-label">Área</label>
          <select class="form-select" id="validationDefault04" required>
            <option selected value="">Seleccionar...</option>
            <option v-for="area in areas" :key="area" :value="area">{{area}}</option>
          </select>
        </div>
        <div class="mb-3 col-3">
          <label for="validationDefault04" class="form-label">Tipo de sensor</label>
          <select v-model="tipoSensorSeleccionado" class="form-select" id="validationDefault04" required>
            <option selected value="">Seleccionar...</option>
            <option v-for="tipo in tiposSensores" :key="tipo" :value="tipo"> {{ tipo }} </option>
          </select>
        </div>
      </div>
      

      <div class="mb-5 col-12">
        <label for="sugerenciaForm" class=" form-label">Descripción</label>
        <textarea class="h-100 form-control" id="sugerenciaForm" rows="7" required></textarea>
      </div>
        
      <div class="col-auto">
        <button type="submit" v-on:click="enviarSugerencia($event)" class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#modalSugerencia">Enviar sugerencia</button>
      </div>
      
    </form>
  </div>

  <div class="modal fade" id="modalSugerencia" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">¡Ya guardamos tu sugerencia!</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum pariatur dignissimos deserunt est tenetur deleniti ut iure, quod numquam aspernatur.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Footer -->
  <footer id="footerBox" class="col-12 text-center text-lg-start bg-light text-muted">
    <!-- Copyright -->
    <div class="col-12 p-3" style="background-color: #DADED3;">
      © 2022 Copyright: IoTeam
    </div>
    <!-- Copyright -->
  </footer>
</template>

<script>
import iotController from "@/middleware/iotController.js";

export default {
  name:"Sugerencias",
  props:{
    user:Object
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
