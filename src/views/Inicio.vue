<template>
  <div id="cardInicio" class="card col-11 col-md-9 mx-auto shadow">
    <h3 class="card-header card-title">
      ¡Bienvenido, {{ this.user.userName }}!
    </h3>
    <div class="card-body text-dark mx-5 mt-4">
      <p class="card-text">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. At optio
        voluptas omnis possimus cum! Id eum est ipsa quam, eveniet explicabo
        aperiam, quas libero dolore voluptates cum dolores assumenda quidem
        consectetur veritatis eaque neque consequatur eligendi corrupti.
        Pariatur molestias laboriosam maiores aspernatur, doloribus explicabo
        laudantium officiis ipsum quos doloremque eius officia voluptatibus
        obcaecati, quisquam labore ab dolorem culpa quia iusto similique ducimus
        autem asperiores. Illo, blanditiis laborum. Velit quas saepe sunt ex
        tempora laudantium iure. Maiores sunt eligendi dolorum vel possimus
        magni, voluptatibus voluptate atque iure autem vitae dolores laboriosam
        eveniet facilis corrupti aperiam quidem. Accusantium labore adipisci
        similique iste incidunt nihil natus porro eveniet corrupti pariatur
        molestias omnis officia laborum, esse obcaecati iure tempore velit? Quia
        alias excepturi facilis?
      </p>
    </div>
  </div>

  <!-- Footer -->
  <footer id="footerBox" class="col-12 text-center text-lg-start text-muted">
    <!-- Copyright -->
    <div class="col-12 p-3">© 2022 Copyright: IoTeam</div>
    <!-- Copyright -->
  </footer>
</template>

<script>
import Auth from "../middleware/auth.js";
import IotController from "../middleware/iotController.js";
export default {
  name: "Inicio",
  props: {
    user: Object,
  },
  data() {
    return {
      usuario: "",
    };
  },
  beforeMount() {
    let userValidar = Auth.getObjectUser();
    let userLocalStorage = Auth.getUserLocalStorage();
    userValidar.userName = this.$route.query.usuario === '' || this.$route.query.usuario === null || this.$route.query.usuario == undefined ? userLocalStorage.userName : this.$route.query.usuario;
    console.log(this.$route.query.usuario)
    userValidar.email = this.$route.query.email === '' || this.$route.query.email === null || this.$route.query.email == undefined ? userLocalStorage.email : this.$route.query.email;
    userValidar.rol = this.$route.query.categoria === '' || this.$route.query.categoria === null || this.$route.query.categoria == undefined ? userLocalStorage.rol : this.$route.query.categoria;
    userValidar.ultimoAnio = this.$route.query.ultimoanio === '' || this.$route.query.ultimoanio === null || this.$route.query.ultimoanio == undefined ? userLocalStorage.ultimoAnio : this.$route.query.ultimoanio;
    userValidar.autorizado = Auth.validarUsuario(userValidar);
    Auth.guardarCredencialesInLocalStorage(userValidar);
    this.$emit("validacionUsuario",userValidar)
  }
};
</script>

<style scoped>
#cardInicioContainer {
  height: calc(90% - 80px);
}

#cardInicio {
  background-color: #daded3;
  display: flex;
  height: calc(90% - 80px);
  border-radius: 2%;
}
/*#inicioBox {
  background: #6fa363;
}

#inicioBox h1 {
  font: 2em "Segoe UI", "Century Gothic";
  color: black;
  font-weight: 400;
}

p {
  font: 16px "Segoe UI", "Century Gothic";
  font-weight: 400;
  color: #000000;
  text-align: center;
}*/

#home #footerBox {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  max-height: 70px !important;
  background-color: #daded3;
}
</style>