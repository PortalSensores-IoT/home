/* globals localStorage */
import axios from "axios"

const URL_API_IOT = 'https://pp1-iot.herokuapp.com/';

const SERVICE_GET_AREAS = 'api/areas'
const SERVICE_GET_AREA_BY_ID = 'api/areas/ids/'
const SERVICE_GET_CANT_PISOS = 'api/areas/pisos'

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
  }
}