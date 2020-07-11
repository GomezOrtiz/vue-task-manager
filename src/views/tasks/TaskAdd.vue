<template>
  <div>
    <h1>Add task</h1>
    <form @submit.prevent="addTask(task)" class="form-inline">
      <div class="input-group mb-2 mr-sm-2">
        <div class="input-group-prepend">
          <div class="input-group-text">Name</div>
        </div>
        <input type="text" v-model="task.name" class="form-control" />
      </div>
      <button type="submit" class="btn btn-success mb-2">Add</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "TaskAdd",
  data() {
    return {
      task: {}
    };
  },
  methods: {
    ...mapActions(["addTask"])
  }
};
</script>