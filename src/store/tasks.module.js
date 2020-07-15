import router from "../router"
import TasksService from "@/services/TasksService"

const initialState = {
    tasks: [],
    task: {},
}

const state = { ...initialState }

export const mutations = {
    SET_TASKS(state, tasks) {
        state.tasks = tasks
    },
    SET_TASK(state, task) {
        state.task = task
    }
}

export const getters = {
    tasks(state) {
        return state.tasks
    },
    task(state) {
        return state.task
    }
}

export const actions = {
    async getTasks({ getters, commit }) {
        if (getters.user) {
            try {
                const tasks = await TasksService.findAll(getters.user.uid)
                commit("SET_TASKS", tasks)
            } catch (error) {
                commit("SET_GLOBAL_ERROR", error.message)
            }
        }
    },
    async getTask({ getters, commit }, id) {
        try {
            const task = await TasksService.findOne(id, getters.user.uid)
            commit("SET_TASK", task)
        } catch (error) {
            commit("SET_GLOBAL_ERROR", error.message)
        }
    },
    async editTask({ getters, commit }, task) {
        try {
            await TasksService.update(task, getters.user.uid)
            router.push("/tasks")
        } catch (error) {
            commit("SET_GLOBAL_ERROR", error.message)
        }
    },
    async addTask({ getters, commit }, task) {
        try {
            await TasksService.create(task, getters.user.uid)
            router.push("/tasks")
        } catch (error) {
            commit("SET_GLOBAL_ERROR", error.message)
        }
    },
    async deleteTask({ getters, commit, dispatch }, id) {
        try {
            await TasksService.delete(id, getters.user.uid)
            dispatch("getTasks")
        } catch (error) {
            commit("SET_GLOBAL_ERROR", error.message)
        }
    }
}

export default { state, mutations, getters, actions }