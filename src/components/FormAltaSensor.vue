<template>
  <div class="modal fade" id="modalAltaSensor" tabindex="-1" aria-labelledby="modalAltaSensor" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Solicitud de alta de sensor</h5>
        </div>
        <div class="modal-body p-0 pt-2">
        <form class="column">
          <div class="form-group mb-3 col-8">
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
            <label for="validationDefault05" class="form-label">Piso</label>
            <select class="form-select" id="validationDefault04" required>
              <option selected value="">Seleccionar piso...</option>
              <option v-for="lugar in lugares" :key="lugar" :value="lugar">{{lugar}}</option>
            </select>
          </div>
          <div class="mb-3 col-8">
            <label for="validationDefault05" class="form-label">Espacio</label>
            <select class="form-select" id="validationDefault04" required>
              <option selected value="">Seleccionar espacio...</option>
              <option v-for="lugar in lugares" :key="lugar" :value="lugar">{{lugar}}</option>
            </select>
          </div>
          <div id="buttonsForms" class="col-12 modal-footer">
            <button id="btnEnviarSolicitud" class="btn btn-success  btn-sm" type="submit">Enviar solicitud</button>
            <button id="btnCancelarSolicitud" @click="limpiarForm()" class="btn btn-outline-danger btn-sm" data-bs-dismiss="modal">Cancelar</button>
          </div>
        </form>
        </div>
      </div>
    </div>
  </div>
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