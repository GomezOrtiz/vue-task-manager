import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from "./firebase"
import Vuelidate from "vuelidate"

Vue.use(Vuelidate)

Vue.config.productionTip = false

auth.onAuthStateChanged(user => {
  if (user) {
    const { uid, email } = user
    store.dispatch("setLoggedInUser", { uid, email })
  } else {
    store.dispatch("setLoggedInUser", null)
  }

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})


