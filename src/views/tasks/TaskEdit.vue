<template>
  <div>
    <h1>Edit task</h1>
    <form @submit.prevent="editTask(task)" class="form-inline">
      <div class="input-group mb-2 mr-sm-2">
        <div class="input-group-prepend">
          <div class="input-group-text">Name</div>
        </div>
        <input type="text" v-model="task.name" class="form-control" />
      </div>
      <button type="submit" class="btn btn-success mb-2">Edit</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "TaskEdit",
  computed: {
    ...mapState(["task"])
  },
  methods: {
    ...mapActions(["getTask", "editTask"])
  },
  created() {
    this.getTask(this.$route.params.id);
  }
};
</script>