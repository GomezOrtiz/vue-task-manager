<template>
  <div id="app">
    <header>
      <Navbar />
    </header>
    <main class="container mt-5">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";

export default {
  name: "App",
  components: { Navbar }
};
</script>