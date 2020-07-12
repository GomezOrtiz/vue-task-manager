<template>
  <div>
    <h1 class="mb-4">User signup</h1>
    <form @submit.prevent="signUp(credentials)">
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
      <div class="form-group">
        <input
          class="form-control"
          type="password"
          placeholder="Repeat password"
          v-model="$v.credentials.repeatPassword.$model"
        />
        <small
          v-if="$v.credentials.repeatPassword.$dirty && !$v.credentials.repeatPassword.sameAsPassword"
          class="text-danger mt-2 d-block"
        >Passwords must be the same</small>
      </div>
      <button class="btn btn-success" type="submit" :disabled="$v.$invalid">Sign up</button>
    </form>
    <small v-if="error" class="text-danger mt-2 d-block">{{ error }}</small>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

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
  validations: {
    credentials: {
      email: { required, email },
      password: { required, minLength: minLength(5) },
      repeatPassword: { sameAsPassword: sameAs("password") }
    }
  },
  computed: {
    ...mapGetters(["error"])
  },
  methods: {
    ...mapActions(["signUp"])
  }
};
</script>