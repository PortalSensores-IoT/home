<template>
    <transition name="slide-fade" mode="out-in">
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
                setTimeout(() => this.show = false, 500);

                iotController.getSensorById(this.sensor.id).then(response => {
                    this.ultimoRegistro = this.getUltimoRegistroValor(response)
                })

                setTimeout(() => this.show = true, 500);
            }, 30000)

        }
    }
};

</script>

<style scoped>

    .slide-fade-enter-active {
    transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }   
</style>