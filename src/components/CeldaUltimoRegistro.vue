<template>
    <transition name="fade">
        <p v-if="show" class="my-auto p-2">
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
            return sensor.registros?.length > 0 ? this.getSignoUnidadDeMedida(sensor, sensor.registros[sensor.registros.length-1].valor) : "-"
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
                setTimeout(() => this.show = false, 2000);

                iotController.getSensorById(this.sensor.id).then(response => {
                    this.ultimoRegistro = this.getUltimoRegistroValor(response)
                    setTimeout(() => this.show = true, 2000);
                })

                
            }, 45000)

        }
    }
};

</script>

<style scoped>

    

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-active:first-child,
.fade-leave-active:first-child{
    width: min-content;
}

.fade-enter-from,
.fade-leave-to {
    transition: 0 2s ease;
    opacity: 0;
}
</style>