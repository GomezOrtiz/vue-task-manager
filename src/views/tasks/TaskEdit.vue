<template>
  <div>
    <h1>Edit task</h1>
    <form @submit.prevent="editTask(task)" class="form-inline">
      <div class="input-group mb-2 mr-sm-2">
        <div class="input-group-prepend">
          <div class="input-group-text">Name</div>
        </div>
        <input type="text" v-model="$v.task.name.$model" class="form-control" />
      </div>
      <button type="submit" class="btn btn-success mb-2" :disabled="$v.$invalid">Edit</button>
    </form>
    <small
      v-if="$v.task.name.$dirty && !$v.task.name.required"
      class="text-danger d-block"
    >Task name cannot be empty</small>
    <small
      v-if="$v.task.name.$dirty && !$v.task.name.minLength"
      class="text-danger d-block"
    >Task name must have at least 5 characters</small>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "TaskEdit",
  computed: {
    ...mapGetters(["task"])
  },
  validations: {
    task: {
      name: { required, minLength: minLength(5) }
    }
  },
  methods: {
    ...mapActions(["getTask", "editTask"])
  },
  created() {
    this.getTask(this.$route.params.id);
  }
};
</script>