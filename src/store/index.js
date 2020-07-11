import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db } from "../firebase"
import router from "../router"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    tasks: [],
    task: {},
    error: ""
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setError(state, error) {
      state.error = error
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    setTask(state, task) {
      state.task = task
    }
  },
  actions: {
    async signUp({ commit }, credentials) {
      if (credentials.password !== credentials.repeatPassword) {
        commit("setError", "Repeated password must be the same")
      } else {
        try {
          const res = await auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
          const { uid, email } = res.user
          await db.collection(`tasks-${uid}`).add({ name: `${email} first task` })
          commit("setUser", { uid, email })
          router.push("/")
        } catch (error) {
          commit("setError", error.message)
        }
      }
    },
    async logIn({ commit }, credentials) {
      try {
        const res = await auth.signInWithEmailAndPassword(credentials.email, credentials.password)
        const { uid, email } = res.user
        commit("setUser", { uid, email })
        router.push("/tasks")
      } catch (error) {
        commit("setError", error.message)
      }
    },
    async logOut({ commit }) {
      try {
        await auth.signOut()
        commit("setUser", null)
        router.push("/login")
      } catch (error) {
        console.log(error)
        // TODO: Show error during signOut message
      }
    },
    async setLoggedInUser({ commit }, user) {
      commit("setUser", user)
    },
    async getTasks({ state, commit }) {
      if(state.user) {
        try {
          const docs = await db.collection(`tasks-${state.user.uid}`).get()
          const tasks = []
          docs.forEach(doc =>
            tasks.push({
              ...doc.data(),
              id: doc.id,
            })
          )
          commit("setTasks", tasks)
        } catch (error) {
          console.log(error)
          // Show error when retrieving all tasks
        }
      }
    },
    async getTask({ state, commit }, id) {
      try {
        const doc = await db.collection(`tasks-${state.user.uid}`).doc(id).get()
        const task = {
          ...doc.data(),
          id
        }
        commit("setTask", task)
      } catch (error) {
        console.log(error)
        // Show error. Not found? Error when retrieving?
      }
    },
    async editTask({ state, dispatch }, task) {
      try {
        await db.collection(`tasks-${state.user.uid}`).doc(task.id).update(task)
        await dispatch("getTasks")
        router.push("/tasks")
      } catch (error) {
        console.log(error)
        // Show error when editing task
      }
    },
    async addTask({ state, dispatch }, task) {
      try {
        await db.collection(`tasks-${state.user.uid}`).add(task)
        await dispatch("getTasks")
        router.push("/tasks")
      } catch (error) {
        console.log(error)
        // Show error when adding task
      }
    },
    async deleteTask({ state, dispatch }, id) {
      try {
        await db.collection(`tasks-${state.user.uid}`).doc(id).delete()
        dispatch("getTasks")
      } catch (error) {
        console.log(error)
        // Show error when deleting task
      }
    }
  },
  getters: {
    isLoggedInUser(state) {
      return !!state.user
    }
  },
  modules: {
  }
})
