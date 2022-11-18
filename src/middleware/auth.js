/* globals localStorage */

export default {

  getObjectUser() {
    return {
      username:"",
      email:"",
      rol:"",
      ultimoanio:"",
      estecnico:"",
      instituto:""
    };
  },

  clearLocalStorage() {
  },

  guardarTokenInLocalStorage(token) {
    sessionStorage.setItem('token',token);
  }

}