<template>
  <div id="contenedorSugerencias" class="bg-light container card border-success col-8 py-20 mt-5 shadow rounded">
    <div class="card-header">¡Envianos tus sugerencias!</div>
    <form class="bg-light mx-30">
      
        <div class="bg-light mb-4 col-4">
          <label align="left" for="asuntoForm" class="bg-light form-label">Asunto</label>
          <input type="email" class="bg-light form-control" id="asuntoForm" placeholder="p. ej.: Nuevo tipo de sensor">
        </div>
        <div class="bg-light mb-5 col-12">
          <label for="sugerenciaForm" class="bg-light form-label">Sugerencia</label>
          <textarea class="h-100 bg-light form-control" id="sugerenciaForm" rows="7"></textarea>
        </div>
        
      <div class="bg-light col-auto">
        <button type="submit" class="btn btn-primary mb-3">Enviar sugerencia</button>
      </div>
      
    </form>
  </div>
</template>

<script>

export default {
  name:"Sugerencias",
  props:{
    user:Object
  },
  beforeMount() {
    this.autenticarUser();
  },
  methods:{
    autenticarUser() {
      if(!this.user.autorizado) {
        window.location.href = "https://www.inkdesign.com.ar";
      }
  }
  }
}
</script>


<style scoped>
  #contenedorSugerencias {
    padding: 0;
  }

  form {
    padding: 20px;
  }

  form div label{
  }
</style>
