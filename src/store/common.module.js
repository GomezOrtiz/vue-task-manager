const initialState = {
    globalError: ""
}

const state = { ...initialState }

export const mutations = {
    SET_GLOBAL_ERROR(state, globalError) {
        state.globalError = globalError
    },
}

export const getters = {
    globalError(state) {
        return state.globalError
    }
}

export const actions = {
    setGlobalError({ commit }, globalError) {
        commit("SET_GLOBAL_ERROR", globalError)
    }
}

export default { state, mutations, getters, actions }