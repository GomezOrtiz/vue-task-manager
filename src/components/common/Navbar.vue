<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-success">
    <router-link class="navbar-brand" to="/">Home</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/tasks">Tasks</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" v-if="!isLoggedInUser" to="/login">Log in</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" v-if="!isLoggedInUser" to="/signup">Sign up</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" style="cursor:pointer;" v-if="isLoggedInUser" to="/" @click.prevent="logOut">Log out</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters(["isLoggedInUser"])
  },
  methods: {
    ...mapActions(["logOut"])
  }
};
</script>