<template>
  <div>
    <h1 class="mb-4">User login</h1>
    <form @submit.prevent="logIn(credentials)">
      <div class="form-group">
        <input class="form-control" type="email" placeholder="Email" v-model="credentials.email" />
      </div>
      <div class="form-group">
        <input
          class="form-control"
          type="password"
          placeholder="Password"
          v-model="credentials.password"
        />
      </div>
      <button class="btn btn-success" type="submit">Log in</button>
    </form>
    <p v-if="error">Error: {{ error }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      credentials: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapState(["error"])
  },
  methods: {
    ...mapActions(["logIn"])
  }
};
</script>