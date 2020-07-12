import router from "../router"
import AuthService from "@/common/services/AuthService"
import TasksService from "@/common/services/TasksService"

const initialState = {
    user: null,
    error: "",
}

const state = { ...initialState }

const mutations = {
    setUser(state, user) {
        state.user = user
    },
    setError(state, error) {
        state.error = error
    },
}

const getters = {
    user(state) {
        return state.user
    },
    error(state) {
        return state.error
    },
    isLoggedInUser(state) {
        return !!state.user
    }
}

const actions = {
    async signUp({ commit }, credentials) {
        if (credentials.password !== credentials.repeatPassword) {
            commit("setError", "Repeated password must be the same")
        } else {
            try {
                const user = await AuthService.signUp(credentials)
                await TasksService.create({ name: "Create some tasks" }, user.uid)
                commit("setUser", user)
                router.push("/")
            } catch (error) {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        commit("setError", "The email address is already in use")
                        break
                    default:
                        console.log(error)
                        // TODO: Show error during signUp message
                        break
                }
            }
        }
    },
    async logIn({ commit }, credentials) {
        try {
            const user = await AuthService.logIn(credentials)
            commit("setUser", user)
            router.push("/tasks")
        } catch (error) {
            switch (error.code) {
                case "auth/user-not-found":
                    commit("setError", "User not found. Wrong email or password?")
                    break
                case "auth/wrong-password":
                    commit("setError", "User not found. Wrong email or password?")
                    break
                default:
                    console.log(error)
                    // TODO: Show error during logIn message
                    break
            }
        }
    },
    async logOut({ commit }) {
        try {
            await AuthService.logOut()
            commit("setUser", null)
            router.push("/login")
        } catch (error) {
            console.log(error)
            // TODO: Show error during signOut message
        }
    },
    async setLoggedInUser({ commit }, user) {
        commit("setUser", user)
    }
}

export default { state, mutations, getters, actions }