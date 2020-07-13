import router, { TASKS_PATH, LOGIN_PATH } from "../router"
import AuthService from "@/services/AuthService"
import TasksService from "@/services/TasksService"

const initialState = {
    user: null,
    error: "",
}

const state = { ...initialState }

const mutations = {
    SET_USER(state, user) {
        state.user = user
    },
    SET_ERROR(state, error) {
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
            commit("SET_ERROR", "Repeated password must be the same")
        } else {
            try {
                await AuthService.signUp(credentials)
                const { uid } = AuthService.getCurrentUser()
                await TasksService.create({ name: "Create some tasks" }, uid)
                router.push(TASKS_PATH)
            } catch (error) {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        commit("SET_ERROR", "The email address is already in use")
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
            await AuthService.logIn(credentials)
            router.push(TASKS_PATH)
        } catch (error) {
            switch (error.code) {
                case "auth/user-not-found":
                    commit("SET_ERROR", "User not found. Wrong email or password?")
                    break
                case "auth/wrong-password":
                    commit("SET_ERROR", "User not found. Wrong email or password?")
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
            commit("SET_USER", null)
            router.push(LOGIN_PATH)
        } catch (error) {
            console.log(error)
            // TODO: Show error during signOut message
        }
    },
    async setLoggedInUser({ commit }, user) {
        commit("SET_USER", user)
    }
}

export default { state, mutations, getters, actions }