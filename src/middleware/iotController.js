/* globals localStorage */
import axios from "axios"

const URL_API_IOT = 'https://pp1-iot.herokuapp.com/';

const PREFIJO_TOKEN = 'Bearer ';

const SERVICE_GET_AREAS = 'api/areas'
const SERVICE_GET_AREA_BY_ID = 'api/areas/ids/'
const SERVICE_GET_CANT_PISOS = 'api/areas/pisos'
const SERVICE_CREATE_TICKET = 'api/tickets/'
const SERVICE_GET_TICKETS = 'api/tickets'
const SERVICE_APROBAR_TICKETS = 'api/tickets/aprobar/'
const SERVICE_RECHAZAR_TICKETS = 'api/tickets/desaprobar/'
const SERVICE_GET_TOKEN_USER = 'api/usuarios/user/token'
const SERVICE_GET_AUTH_USER = 'api/usuarios/user/auth'
const SERVICE_GET_AREAS_BY_PISO = 'api/areas/nombres/'
const SERVICE_GET_TIPO_SENSORES = 'api/sensores/tipos/'

const PREFIJO_PISOS = 'piso '

export default {
  async getAreas() {
    let result = await axios.get(URL_API_IOT + SERVICE_GET_AREAS)
      .then(async (response) => {
        let pisos = await this.getCantidadPisos();
        let areas = [];
        for (let i = 0; i < pisos.length; i++) {
          let piso = response.data[PREFIJO_PISOS + i];
          for (let i = 0; i < piso.length; i++) {
            areas.push(piso[i]);
          }
        }
        return areas;
      })
      .catch(err => {
        console.log(err);
      });
    return result;
  },

  async getAreaById(id) {
    let result = axios.get(URL_API_IOT + SERVICE_GET_AREA_BY_ID + id)
      .then(async (response) => {
        return response.data;
       })
      .catch(err => {
        console.log(err);
      });
    return result;
  },

  async getCantidadPisos() {
    let result = await axios.get(URL_API_IOT + SERVICE_GET_CANT_PISOS)
      .then(async (response) => {
        return response.data;
      })
      .catch(err => {
        console.log(err);
      });
    return result;
  },

  async crearTicketSensor(solicitud){
    let config = {
      headers:{
        Authorization: PREFIJO_TOKEN + window.localStorage.token
      }
    };
    let body = {
      "tipo": solicitud.tipo,
      "tipoSensor": solicitud.tipoSensor,
      "nombreArea": solicitud.area,
      "descripcion": solicitud.descripcion,
      "idSensor": solicitud.idSensor,
      "urls": solicitud.urls
    }
    let result = await axios.post(URL_API_IOT + SERVICE_CREATE_TICKET, body, config)
      .then(async (response) => {
        return response.data;
      })
      .catch(err => {
        console.log(err);
      });
    return result;
  },

  async validarUsuario(user) {
    let esUltimoAnio = user.ultimoanio === 'si' ? true : false;
    let esTecnico = user.estecnico === 'si' ? true : false;
    if(user.rol === "directivo") {
      if(esTecnico) {
        user.rol = "TECNICO";
      } else {
        user.rol = "DIRECTIVO";
      }
    }
    if(user.rol === "alumno") {
      if(esUltimoAnio) {
        user.rol = "ALUMNO_ULTIMO_ANIO ";
      } else {
        user.rol = "ALUMNO";
      }
    }
    if(user.rol === "admin") {
      user.rol = "ADMIN";
    }
    let config = {
      headers:{
        email:user.email,
        usuario:user.username,
        rol:user.rol
      }
    };
    let result = await axios.get(URL_API_IOT + SERVICE_GET_TOKEN_USER, config)
    .then(async (response) => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
  return result;
  },

  async getAutorizaciones(token) {
    let config = {
      headers:{
        Authorization: PREFIJO_TOKEN + token
      }
    }
    let result = await axios.get(URL_API_IOT + SERVICE_GET_AUTH_USER, config)
    .then(async (response) => {
      return response.data
    })
    .catch(err => {
      console.log(err);
    });
  return result;
  },

  async getAreasByPiso(piso) {
    let result = await axios.get(URL_API_IOT + SERVICE_GET_AREAS_BY_PISO + piso)
      .then(async (response) => {
          return response.data[PREFIJO_PISOS + piso];
      })
      .catch(err => {
        console.log(err);
      });
    return result;
  },

  async getTiposDeSensores() {
    let result = await axios.get(URL_API_IOT + SERVICE_GET_TIPO_SENSORES)
      .then(async (response) => {
          return response.data;
      })
      .catch(err => {
        console.log(err);
      });
    return result;
  },

  async formatearTiposDeSensores(arr){
    let arrTiposDeSensores = [];
    for(let i = 0 ; i < arr.length ; i++){
      let palabra = arr[i];
      if(palabra != 'NO_IDENTIFICADO'){
        let original = palabra;
        palabra = palabra.replaceAll('_',' ');
        palabra = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
        arrTiposDeSensores.push({id:original, descripcion:palabra})
      }
    }
    return arrTiposDeSensores;
  },

  async getTickets() {
    let result = await axios.get(URL_API_IOT + SERVICE_GET_TICKETS)
      .then(async (response) => {
        
        return response.data;
      })
      .catch(err => {
        console.log(err);
      });
    return result;
  },

  async getSugerencias() {
    let tickets = await this.getTickets();

    const result = tickets.filter( ticket => ticket.tipo === 'SUGERENCIA');

    return result
  },

  async getSugerenciasByEstado(estado) {
    let tickets = await this.getSugerencias();

    const result = tickets.filter( ticket => ticket.estado == estado);

    return result
  },

  async getSolicitudes() {
    let tickets = await this.getTickets();

    const result = tickets.filter( ticket => ticket.tipo != 'SUGERENCIA');

    return result
  },

  async getSolicitudesByEstado(estado) {
    let tickets = await this.getSolicitudes();

    const result = tickets.filter( ticket => ticket.estado == estado);

    return result
  },

  async aprobarTicket(id){
    let config = {
      headers:{
        Authorization: PREFIJO_TOKEN + window.localStorage.token,
        'Access-Control-Allow-Origin': '*'
      }
    };

    let result = await axios.put(URL_API_IOT + SERVICE_APROBAR_TICKETS + id, config)
      .then(async (response) => {
        return response.data
    })
      .catch(err => {
        console.log(err);
    });

    return result;
  },

  async rechazarTicket(id){
    let config = {
      headers:{
        'Authorization': PREFIJO_TOKEN + window.localStorage.token,
        'Access-Control-Allow-Origin': '*'
      }
    };

    let result = await axios.put(URL_API_IOT + SERVICE_RECHAZAR_TICKETS + id, config)
      .then(async (response) => {
        return response.data
    })
      .catch(err => {
        console.log(err);
    });

    return result;
  }
}