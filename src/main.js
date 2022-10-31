import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import vueAxios from 'vue-axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import VueCryptojs from 'vue-cryptojs'

createApp(App).use(router, axios, vueAxios, VueCryptojs).mount('#app');