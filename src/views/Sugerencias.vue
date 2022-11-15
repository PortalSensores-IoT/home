<template>
  <div>
    <button id="btnEnviarSugerencia" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAltaSugerencia" v-show="this.autorizaciones['Alta sugerencia']">
      Enviar sugerencia
    </button>
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
