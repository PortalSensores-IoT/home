/* globals localStorage */
import axios from "axios"

const URL_API_IOT = 'https://pp1-iot.herokuapp.com/';

const PREFIJO_TOKEN = 'Bearer ';

const SERVICE_GET_AREAS = 'api/areas'
const SERVICE_GET_AREA_BY_ID = 'api/areas/ids/'
const SERVICE_GET_CANT_PISOS = 'api/areas/pisos'
const SERVICE_CREATE_TICKET = 'api/tickets/'
const SERVICE_GET_TOKEN_USER = 'api/usuarios/user/token'
const SERVICE_GET_AUTH_USER = 'api/usuarios/user/auth'
const SERVICE_GET_AREAS_BY_PISO = 'api/areas/nombres/'

const PREFIJO_PISOS = 'piso '

export default {
  async getAreas() {
    let result = axios.get(URL_API_IOT + SERVICE_GET_AREAS)
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
    let result = axios.get(URL_API_IOT + SERVICE_GET_CANT_PISOS)
      .then(async (response) => {
        return response.data;
      })
      .catch(err => {
        console.log(err);
      });
    return result;
  },

  async crearTicketSensor(solicitud){
    let result = axios.get(URL_API_IOT + SERVICE_CREATE_TICKET)
      .then(async (response) => {
        return response.data;
      })
      .catch(err => {
        console.log(err);
      });
    return result;
  },

  async validarUsuario(user) {
    let esUltimoAnio = user.ultimoAnio === 'si' ? true : false;
    let esTecnico = user.esTecnico === 'si' ? true : false;
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
        'email':user.email,
        'usuario':user.username,
        'rol':user.rol
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
    let result = axios.get(URL_API_IOT + SERVICE_GET_AREAS_BY_PISO + piso)
      .then(async (response) => {
          return response.data[PREFIJO_PISOS + piso];
      })
      .catch(err => {
        console.log(err);
      });
    return result;
  },
}