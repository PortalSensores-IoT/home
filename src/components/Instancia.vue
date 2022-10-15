<template>
<div>
    <div>{{instancia.frecuenciaRegistro}}</div>
    <div>{{instancia.nombre}}</div>
    <div>{{instancia.piso}}</div>
    <div>{{instancia.tipo}}</div>
</div>
</template>

<script>

export default {
    name:"Instancia",
    props:"instancia"
}
</script>
