<template>
  
    <div id="cardInicio" class="card col-11 col-md-8 mx-auto shadow">

      <h3 class="card-header card-title">¡Bienvenido, {{ this.user.userName }}!</h3>
      <div class="card-body text-dark mx-5 mt-4">
        <p class="card-text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. At optio voluptas omnis possimus cum! Id eum est ipsa quam, eveniet explicabo aperiam, quas libero dolore voluptates cum dolores assumenda quidem consectetur veritatis eaque neque consequatur eligendi corrupti. Pariatur molestias laboriosam maiores aspernatur, doloribus explicabo laudantium officiis ipsum quos doloremque eius officia voluptatibus obcaecati, quisquam labore ab dolorem culpa quia iusto similique ducimus autem asperiores. Illo, blanditiis laborum. Velit quas saepe sunt ex tempora laudantium iure. Maiores sunt eligendi dolorum vel possimus magni, voluptatibus voluptate atque iure autem vitae dolores laboriosam eveniet facilis corrupti aperiam quidem. Accusantium labore adipisci similique iste incidunt nihil natus porro eveniet corrupti pariatur molestias omnis officia laborum, esse obcaecati iure tempore velit? Quia alias excepturi facilis?
        </p>
      </div>
    </div>

  
  <!-- Footer -->
  <footer id="footerBox" class="col-12 text-center text-lg-start bg-light text-muted">
    <!-- Copyright -->
    <div class="col-12 p-3" style="background-color: #fff;">
      © 2022 Copyright: IoTeam
    </div>
    <!-- Copyright -->
  </footer>
</template>

<script>
import Auth from "../auth.js";

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
    this.autenticarUser();
  },
  methods: {
    autenticarUser() {
      if (this.user.autorizado === false) {
        let user = {
          userName: this.$route.query.usuario,
          email: this.$route.query.email,
          rol: this.$route.query.categoria,
          ultimoAnio: this.$route.query.ultimoanio,
          autorizado: false
        }
        user.autorizado = Auth.validarUsuario(user.rol, user.ultimoAnio, user.email, user.userName);
        if (!user.autorizado) {
          window.location.href = "https://www.inkdesign.com.ar";
        }
        this.$emit("validacionUsuario", user);
      }
    }
  }
};
</script>

<style scoped>

#cardInicioContainer {
  height: calc(90% - 70px);
}

#cardInicio {
  background-color: #DADED3;
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
}
</style>