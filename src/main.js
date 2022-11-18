import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import vueAxios from 'vue-axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import VueCryptojs from 'vue-cryptojs'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faTowerBroadcast, faTableList, faHouse, faPen, faCheck, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'

library.add(faTowerBroadcast, faTableList, faHouse, faPen, faCheck, faSkullCrossbones)

createApp(App)
    .use(router, axios, vueAxios, VueCryptojs)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');