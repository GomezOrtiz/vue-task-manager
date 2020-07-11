<template>
  <div>
    <h1>Protected route</h1>
    <p>You are allowed to be here, {{ user && user.email }}</p>
    <h2>Tasks</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">{{task.name}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Secret",
  computed: {
    ...mapState(["user", "tasks"])
  },
  methods: {
    ...mapActions(["getTasks"])
  },
  created() {
    this.getTasks();
  }
};
</script>