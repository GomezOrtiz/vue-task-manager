import router from "../router"
import TasksService from "@/common/services/TasksService"

const initialState = {
    tasks: [],
    task: {},
    loading: false
}

const state = { ...initialState }

const mutations = {
    setTasks(state, tasks) {
        state.tasks = tasks
    },
    setTask(state, task) {
        state.task = task
    },
    setLoading(state, loading) {
        state.loading = loading
    }
}

const getters = {
    tasks(state) {
        return state.tasks
    },
    task(state) {
        return state.task
    },
    loading(state) {
        return state.loading
    }
}

const actions = {
    async getTasks({ getters, commit }) {
        if (getters.user) {
            try {
                commit("setLoading", true)
                const tasks = await TasksService.findAll(getters.user.uid)
                commit("setTasks", tasks)
                commit("setLoading", false)
            } catch (error) {
                console.log(error)
                // Show error when retrieving all tasks
            }
        }
    },
    async getTask({ getters, commit }, id) {
        try {
            const task = await TasksService.findOne(id, getters.user.uid)
            commit("setTask", task)
        } catch (error) {
            console.log(error)
            // Show error. Not found? Error when retrieving?
        }
    },
    async editTask({ getters, dispatch }, task) {
        try {
            await TasksService.update(task, getters.user.uid)
            await dispatch("getTasks")
            router.push("/tasks")
        } catch (error) {
            console.log(error)
            // Show error when editing task
        }
    },
    async addTask({ getters, dispatch }, task) {
        try {
            await TasksService.create(task, getters.user.uid)
            await dispatch("getTasks")
            router.push("/tasks")
        } catch (error) {
            console.log(error)
            // Show error when adding task
        }
    },
    async deleteTask({ getters, dispatch }, id) {
        try {
            await TasksService.delete(id, getters.user.uid)
            dispatch("getTasks")
        } catch (error) {
            console.log(error)
            // Show error when deleting task
        }
    }
}

export default { state, mutations, getters, actions }