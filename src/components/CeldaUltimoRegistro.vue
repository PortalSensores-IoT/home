<template>
    <transition name="fade" mode="out-in">
        <p v-if="show" class="m-auto">
            {{ this.ultimoRegistro }}
        </p>
    </transition>
    
</template>

<script>
import iotController from '@/middleware/iotController';


export default {

    name: "CeldaUltimoRegistro",
    props: {
        sensor: Object,
    },
    data() {
        return {
            ultimoRegistro: "",
            show: true,
        }
    },
    mounted() {
        this.actualizarRegistro()
    },
    methods: {
        getUltimoRegistroValor(sensor) {
            return sensor.registros.length > 0 ? this.getSignoUnidadDeMedida(sensor, sensor.registros[sensor.registros.length-1].valor) : "-"
        },
        getSignoUnidadDeMedida(sensor, valor) {
            switch (sensor.unidadDeMedida) {
                case 'Porcentaje':
                    return valor + '%';
                case 'Celcius':
                    return valor + '°C';
                case 'Decibeles':
                    return valor + 'dB';
                case 'ppm':
                    return valor + 'ppm';
                case 'Boolean':
                    if (sensor.tipo === 'PUERTA' || sensor.tipo === 'VENTANA') {
                        return valor == 1 ? ' Abierta' : ' Cerrada';
                    } else {
                        return valor == 1 ? ' Activado' : ' Desactivado';
                    }
                case undefined:
                    return '-';
            }
        },
        actualizarRegistro() {

            this.ultimoRegistro = this.getUltimoRegistroValor(this.sensor)

            setInterval(() => {
                this.show = false
                console.log("Antes: " + this.ultimoRegistro)

                iotController.getSensorById(this.sensor.id).then(response => {
                    this.ultimoRegistro = this.getUltimoRegistroValor(response)
                })

                console.log("Después: " + this.ultimoRegistro)

                setTimeout(() => this.show = true, 500);
               
            }, 10000)

        }
    }
};

</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
    transition: opacity 1s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
    }
</style>