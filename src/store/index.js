import Vue from 'vue'
import Vuex from 'vuex'
import common from "./common.module"
import auth from "./auth.module"
import tasks from "./tasks.module"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    auth,
    tasks
  }
})
