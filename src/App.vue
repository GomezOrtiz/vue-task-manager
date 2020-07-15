<template>
  <div id="app">
    <header>
      <Navbar />
    </header>
    <main class="container mt-5">
      <router-view />
    </main>
    <ErrorToast v-if="globalError" :error="globalError" />
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";
import ErrorToast from "@/components/common/ErrorToast";
import { mapGetters } from 'vuex';

export default {
  name: "App",
  computed: {
    ...mapGetters(["globalError"])
  },
  components: { Navbar, ErrorToast }
};
</script>