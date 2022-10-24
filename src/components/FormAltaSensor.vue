<template>
  <dialog id="dialogForm" open>

    <form class="column center">
      <div class="form-group mb-3 col-8 abs-center">
        <label for="validationDefault03" class="form-label">Unidad de medida</label>
        <input type="text" class="col-8 form-control" id="validationDefault03" required>
      </div>
      <div class="mb-3 col-8">
        <label for="validationDefault04" class="form-label">Tipo de sensor</label>
        <select v-model="tipoSensorSeleccionado" class="form-select" id="validationDefault04" required>
          <option selected value="">Seleccionar tipo...</option>
          <option v-for="tipo in tiposSensores" :key="tipo" :value="tipo"> {{ tipo }} </option>
        </select>
      </div>
      <div class="mb-3 col-8">
        <label for="validationDefault05" class="form-label">Espacio</label>
        <select class="form-select" id="validationDefault04" required>
          <option selected value="">Seleccionar espacio...</option>
          <option v-for="lugar in lugares" :key="lugar" :value="lugar">{{lugar}}</option>
        </select>
      </div>
      <div id="buttonsForms" class="col-12">
        <button id="btnEnviarSolicitud" class="btn btn-success  btn-sm" type="submit">Enviar solicitud</button>
        <button id="btnCancelarSolicitud" @click="limpiarForm()" class="btn btn-danger btn-sm">Cancelar</button>
      </div>
    </form>
  </dialog>
</template>

<script>

export default {
  name: "FormAltaSensor",
  props: {
    },
  data() {
    return {
      tiposSensores: ['Temperatura','Puerta','Humedad','Calidad de Aire','Proximidad','Humo','Gas','Nivel de ruido'],
      lugares: ['Aula 1', 'Aula 2', 'Aula 3', 'Aula 4', 'Aula 5'],
      lugarSeleccionado: "",
      tipoSensorSeleccionado: ""
      };
  },
  methods:{
    cerrarForm(){
      this.limpiarForm();
    },
    limpiarForm(){
      this.$emit('ocultarForm', false);
    }
  }
};
</script>

<style scoped>

  #dialogForm {
    position: absolute;
    top: 20%;
    width: 30%;
    left: 35%;
    padding: 15px 15px 15px;
    display: flex;
    flex-direction: column;
    background: hsl(147, 55%, 39%);
    border-radius: 2px;
    border-color: rgba(35, 82, 58, 0.734);
  }

  #buttonsForms{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  form, form div, form div label{
    background: #2d995e;
  }
  form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  form div{
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: left;
    text-align: start;
  }

  #btnEnviarSolicitud{
    margin-right: 15px;
  }

  
</style>