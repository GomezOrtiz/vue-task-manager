import { mutations, getters, actions } from "@/store/common.module"

const GLOBAL_ERROR = "Something bad happend"

describe('Name of the group', () => {
    
    let state, commit

    beforeEach(() => {
        state = {
            globalError: ""
        }
        commit = jest.fn()
    })

    describe("SET_GLOBAL_ERROR", () => {

        it("should set a global error in the state", () => {

            mutations.SET_GLOBAL_ERROR(state, GLOBAL_ERROR)

            expect(state).toEqual({ globalError: GLOBAL_ERROR })
            expect(getters.globalError(state)).toEqual(GLOBAL_ERROR)
        })
    })   

    describe("setGlobalError", () => {

        it("should commit a global error", async () => {

            await actions.setGlobalError({ commit }, GLOBAL_ERROR)

            expect(commit).toHaveBeenCalledWith("SET_GLOBAL_ERROR", GLOBAL_ERROR)
        })
    })
});