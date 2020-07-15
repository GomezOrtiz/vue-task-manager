<template>
  <div v-if="error" :class="`toast ${show ? 'show' : ''}`" role="alert">
    <div class="toast-header">
      <img src="@/assets/error_icon.png" height="20px" class="rounded mr-2" alt="Error icon" />
      <strong class="mr-auto">Something went bad</strong>
      <button type="button" class="ml-2 mb-1 close" @click="hide">
        <span>&times;</span>
      </button>
    </div>
    <div class="toast-body">{{error}}</div>
  </div>
</template>

<script>
export default {
  name: "ErrorToast",
  props: ["error"],
  methods: {
    hide() {
      this.show = false;
    }
  },
  data() {
    return {
      show: true
    };
  },
  created() {
    setTimeout(() => {
      this.show = false;
    }, 3000);
  }
};
</script>

<style scoped>
.show {
  position: absolute;
  bottom: 20px;
  right: 20px;
  opacity: 100;
}
</style>