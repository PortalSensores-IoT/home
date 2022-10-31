/* globals localStorage */

const LLAVE_DE_ENCRIPTACION = "43Hv*gdPuc^km9bT^MbFASH&G9LiZ&jg"

export default {

  getObjectUser() {
    return {
      userName: "",
      email: "",
      rol: "",
      ultimoAnio: "",
      autorizado: false
    };
  },

  getUserLocalStorage() {
    let user = this.getObjectUser();
    user.userName = this.desEncriptarString(localStorage.userName);
    user.email = this.desEncriptarString(localStorage.email);
    user.rol = this.desEncriptarString(localStorage.rol);
    user.ultimoAnio = this.desEncriptarString(localStorage.ultimoAnio);
    user.autorizado = this.desEncriptarString(Number(localStorage.autorizado) === 1 ? true : false);
    return user;
  },

  validarUsuario(user) {
    if (user.rol === "directivo" || (user.rol === "alumno" && user.ultimoAnio === 'si')) {
      if (user.userName !== '' && user.userName !== undefined && user.email !== '' && user.email !== undefined) {
        return true;
      }
    }
    return false;
  },

  guardarCredencialesInLocalStorage(user) {
    localStorage.userName = this.encriptarString(user.userName);
    localStorage.email = this.encriptarString(user.email);
    localStorage.rol = this.encriptarString(user.rol);
    localStorage.ultimoAnio = this.encriptarString(user.ultimoAnio);
    localStorage.autorizado = this.encriptarString(user.autorizado ? 1 : 0);
  },

  encriptarString(str) {
    //var encrypted = this.$CryptoJS.AES.encrypt(str, LLAVE_DE_ENCRIPTACION);
    return str;
  },

  desEncriptarString(str) {
    //var decrypted = this.$CryptoJS.AES.decrypt(str, LLAVE_DE_ENCRIPTACION);
    return str;
  },

  /*autenticarUserByUrl(userName, email, rol, ultimoAnio) {
    let user = this.getObjectUser();
    user.userName = userName;
    user.email = email;
    user.rol = rol;
    user.ultimoAnio = ultimoAnio;
    user.autorizado = this.validarUsuario(user);
    return user;
  },*/

  autenticarUser(userClient) {
    let user = this.getObjectUser();
    user.userName = userClient.userName;
    user.email = userClient.email;
    user.rol = userClient.categoria;
    user.ultimoAnio = userClient.ultimoAnio;
    user.autorizado = this.validarUsuario(userClient);
    return user;
  }

}