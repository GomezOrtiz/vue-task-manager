import router from "@/router"
import { TASKS_PATH } from "@/router/tasks.routes"
import { LOGIN_PATH } from "@/router/auth.routes"
import AuthService from "@/services/AuthService"
import TasksService from "@/services/TasksService"

const initialState = {
    user: null,
    authError: "",
}

const state = { ...initialState }

export const mutations = {
    SET_USER(state, user) {
        state.user = user
    },
    SET_AUTH_ERROR(state, authError) {
        state.authError = authError
    },
}

export const getters = {
    user(state) {
        return state.user
    },
    authError(state) {
        return state.authError
    },
    isLoggedInUser(state) {
        return !!state.user
    }
}

export const actions = {
    async signUp({ commit }, credentials) {
        if (credentials.password !== credentials.repeatPassword) {
            commit("SET_AUTH_ERROR", "Repeated password must be the same")
        } else {
            try {
                await AuthService.signUp(credentials)
                const { uid } = AuthService.getCurrentUser()
                await TasksService.create({ name: "Create some tasks" }, uid)
                router.push(TASKS_PATH)
            } catch (error) {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        commit("SET_AUTH_ERROR", "The email address is already in use")
                        break
                    default:
                        commit("SET_GLOBAL_ERROR", error.message)
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
                    commit("SET_AUTH_ERROR", "User not found. Wrong email or password?")
                    break
                case "auth/wrong-password":
                    commit("SET_AUTH_ERROR", "User not found. Wrong email or password?")
                    break
                default:
                    commit("SET_GLOBAL_ERROR", error.message)
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
            commit("SET_GLOBAL_ERROR", error.message)
        }
    },
    async setLoggedInUser({ commit }, user) {
        commit("SET_USER", user)
    }
}

export default { state, mutations, getters, actions }