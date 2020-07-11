<template>
  <div>
    <h1 class="mb-4">User login</h1>
    <form @submit.prevent="logIn(credentials)">
      <div class="form-group">
        <input
          class="form-control"
          type="email"
          placeholder="Email"
          v-model="$v.credentials.email.$model"
        />
        <small
          v-if="$v.credentials.email.$dirty && !$v.credentials.email.required"
          class="text-danger mt-2 d-block"
        >Email cannot be empty</small>
        <small
          v-if="$v.credentials.email.$dirty && !$v.credentials.email.email"
          class="text-danger mt-2 d-block"
        >Must be a valid email</small>
      </div>
      <div class="form-group">
        <input
          class="form-control"
          type="password"
          placeholder="Password"
          v-model="$v.credentials.password.$model"
        />
        <small
          v-if="$v.credentials.password.$dirty && !$v.credentials.password.required"
          class="text-danger mt-2 d-block"
        >Password cannot be empty</small>
        <small
          v-if="$v.credentials.password.$dirty && !$v.credentials.password.minLength"
          class="text-danger mt-2 d-block"
        >Password must have at least 5 characters</small>
      </div>
      <button class="btn btn-success" type="submit" :disabled="$v.$invalid">Log in</button>
    </form>
    <p v-if="error">Error: {{ error }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { required, email, minLength } from "vuelidate/lib/validators";

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
  validations: {
    credentials: {
      email: { required, email },
      password: { required, minLength: minLength(5) }
    }
  },
  computed: {
    ...mapState(["error"])
  },
  methods: {
    ...mapActions(["logIn"])
  }
};
</script>