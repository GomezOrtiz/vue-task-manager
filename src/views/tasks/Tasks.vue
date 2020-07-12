<template>
  <div>
    <h1 class="text-center mb-4">Tasks list</h1>
    <router-link to="/tasks/add">
      <button class="btn btn-success btn-block">Add task</button>
    </router-link>
    <PulseLoader class="text-center mt-5" :loading="loading" />
    <ul v-if="!loading" class="list-group mt-5">
      <li v-for="(task, idx) in tasks" :key="idx" class="list-group-item">
        {{ task.name }}
        <div class="float-right">
          <router-link :to="`/tasks/edit/${task.id}`">
            <button class="btn btn-warning btn-sm mr-2">Edit</button>
          </router-link>
          <button @click="deleteTask(task.id)" class="btn btn-danger btn-sm">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PulseLoader from "vue-spinner/src/PulseLoader";

export default {
  name: "Inicio",
  components: { PulseLoader },
  computed: {
    ...mapGetters(["tasks", "loading"])
  },
  methods: {
    ...mapActions(["getTasks", "deleteTask"])
  },
  created() {
    this.getTasks();
  }
};
</script>