/* globals localStorage */

export default {
    validarUsuario(rol, estudianteUltimoAnio, email, user){
      if(rol === "directivo" || (rol === "alumno" && estudianteUltimoAnio === 'si')) {
        if( user !== '' && user !== undefined && email !== '' && email !== undefined ) {
          return true;
        }
      }
      return false;
    }
  }