<template>
  <div>
    <h1 class="mb-4">User signup</h1>
    <form @submit.prevent="signUp(credentials)">
      <div class="form-group">
        <input class="form-control" type="email" placeholder="Email" v-model="credentials.email" />
      </div>
      <div class="form-group">
        <input class="form-control" type="password" placeholder="Password" v-model="credentials.password" />
      </div>
      <div class="form-group">
        <input class="form-control" type="password" placeholder="Repeat password" v-model="credentials.repeatPassword" />
      </div>
      <button class="btn btn-success" type="submit" :disabled="disabled">Sign up</button>
    </form>
    <p v-if="error">Error: {{ error }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Signup",
  data() {
    return {
      credentials: {
        email: "",
        password: "",
        repeatPassword: ""
      }
    };
  },
  computed: {
    ...mapState(["error"]),
    disabled() {
      return (
        !this.credentials.password.trim() ||
        !this.credentials.repeatPassword.trim() ||
        this.credentials.password !== this.credentials.repeatPassword
      );
    }
  },
  methods: {
    ...mapActions(["signUp"])
  }
};
</script>