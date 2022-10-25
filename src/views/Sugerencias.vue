<template>
  <div id="cardSugerencias" class=" container card border-success col-11 col-md-9  py-20  shadow" style="border-radius: 2%;">
    <h3 class="card-header card-title">¡Envianos tus sugerencias!</h3>
    <form class="mx-30">
      
      <div class=" mb-4 col-7 col-md-4">
        <label for="asuntoForm" class="text-left  form-label">Asunto</label>
        <input type="text" class="form-control" id="asuntoForm" placeholder="p. ej.: Nuevo tipo de sensor" required>
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

export default {
  name:"Sugerencias",
  props:{
    user:Object
  },
  beforeMount() {
  },
  methods:{
    enviarSugerencia: function (event) {
      if (event) {
        event.preventDefault()
      }
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
</style>
