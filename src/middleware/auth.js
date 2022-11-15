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
    localStorage.removeItem('token');
  },

  guardarTokenInLocalStorage(token) {
    localStorage.token = token
  }

}