<template>
  <div>
    <h2>Login</h2>
    <p v-if="$route.query.redirect">
      You need to login first.
    </p>
    <form @submit.prevent="login">
      <label><input v-model="email" placeholder="Usuario"></label>
      <label><input v-model="pass" placeholder="Clave" type="password"></label>
      <button type="submit">Login</button>
      <p v-if="error" class="error">Bad login information</p>
    </form>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  name:'login',
  data () {
    return {
      email: '',
      pass: '',
      error: false
    }
  },
  methods: {
    login () {
      auth.login(this.email, this.pass, loggedIn => {
        if (!loggedIn) {
          this.error = true
        } else {
          this.$router.replace(this.$route.query.redirect || '/login')
        }
      })
    }
  }
}
</script>

<style>

.error {
  color: red;
}

input {
  display: block;
  height: 30px;
  width: 200px;
  margin: 20px auto;
  font-size: 14px;
  background:#ffffff;

  cursor: text !important;
	border-radius: 2px;
	border:none;
	box-sizing: border-box !important;
	box-shadow: none !important;
	outline: none !important;
	font-size: 15px !important;
	font-family: "Open Sans", Helvetica, Arial, sans-serif;
	color: #898989;
}

button {
  display: block;
  height: 30px;
  width: 200px;
  margin: 20px auto;
  border-radius: 5px;
  border-style: none;
  font-size: 14px;

  background:#1b9752;
	color:white;
}
</style>