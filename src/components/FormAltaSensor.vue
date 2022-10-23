<template>
  <div>
    <transition>
      <div class="modal" v-if="showModalAltaSensor">
        <h1>CONTENIDO DEL MODAL</h1>
        <button @click="showModalAltaSensor=false">Cerrar</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "FormAltaSensor",
  props: {
    showModalAltaSensor: Boolean
  },
  data() {
    return {};
  },
};
</script>
