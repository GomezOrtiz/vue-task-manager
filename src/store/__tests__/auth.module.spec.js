import { mutations, getters, actions } from "@/store/auth.module"

const GLOBAL_ERROR = "Something bad happened"

jest.mock("@/services/AuthService")
jest.mock("@/services/TasksService")
jest.mock("@/router", () => {
    return {
        TASKS_PATH: "/tasks",
        LOGIN_PATH: "/login",
        push: jest.fn()
    }
})

import AuthService, { MOCK_USER, VALID_CREDENTIALS } from "@/services/AuthService"
import TasksService from "@/services/TasksService"
import router, { TASKS_PATH, LOGIN_PATH } from "@/router"

describe("Auth store module", () => {

    let state, commit

    beforeEach(() => {
        state = {
            user: {},
            authError: ""
        }
        commit = jest.fn()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("SET_USER", () => {
        it("should set a post in the state", () => {

            mutations.SET_USER(state, MOCK_USER)

            expect(state).toEqual({ user: MOCK_USER, authError: "" })
            expect(getters.user(state)).toEqual(MOCK_USER)
            expect(getters.isLoggedInUser(state)).toBe(true)
        })
    })

    describe("SET_AUTH_ERROR", () => {

        it("should set an error in the state", () => {

            const expectedError = "Something bad happened"

            mutations.SET_AUTH_ERROR(state, expectedError)

            expect(state).toEqual({ user: {}, authError: expectedError })
            expect(getters.authError(state, expectedError))
        })
    })

    describe("signUp", () => {
        it("should signUp with valid credentials", async () => {

            await actions.signUp({ commit }, VALID_CREDENTIALS)

            expect(AuthService.signUp).toHaveBeenCalledWith(VALID_CREDENTIALS)
            expect(AuthService.getCurrentUser).toHaveBeenCalled()
            expect(TasksService.create).toHaveBeenCalledWith({ name: "Create some tasks" }, MOCK_USER.uid)
            expect(router.push).toHaveBeenCalledWith(TASKS_PATH)
        })

        it("should commit an error with wrong repeated password", async () => {

            const credentials = { email: "test@ŧest.com", password: "password", repeatPassword: "another" }

            await actions.signUp({ commit }, credentials)

            expect(commit).toHaveBeenCalledWith("SET_AUTH_ERROR", "Repeated password must be the same")
        })

        it("should commit an error when returned by the service", async () => {

            const credentials = { email: "alreadyinuse@email.com", password: "password", repeatPassword: "password" }

            await actions.signUp({ commit }, credentials)

            expect(AuthService.signUp(credentials)).rejects.toEqual({ code: "auth/email-already-in-use" })
            expect(AuthService.getCurrentUser).not.toHaveBeenCalled()
            expect(TasksService.create).not.toHaveBeenCalled()
            expect(router.push).not.toHaveBeenCalled()
            expect(commit).toHaveBeenCalledWith("SET_AUTH_ERROR", "The email address is already in use")
        })

        it("should commit a global error when something bad happened", async () => {

            AuthService.signUp = jest.fn(() => {
                throw new Error(GLOBAL_ERROR)
            })

            await actions.signUp({ commit }, VALID_CREDENTIALS)

            expect(AuthService.signUp).toHaveBeenCalledWith(VALID_CREDENTIALS)
            expect(AuthService.getCurrentUser).not.toHaveBeenCalled()
            expect(TasksService.create).not.toHaveBeenCalled()
            expect(router.push).not.toHaveBeenCalled()
            expect(commit).toHaveBeenCalledWith("SET_GLOBAL_ERROR", GLOBAL_ERROR)
        })
    })

    describe("logIn", () => {
        it("should logIn with valid credentials", async () => {

            await actions.logIn({ commit }, VALID_CREDENTIALS)

            expect(AuthService.logIn).toHaveBeenCalledWith(VALID_CREDENTIALS)
            expect(router.push).toHaveBeenCalledWith(TASKS_PATH)
        })

        it("should commit user-not-found error when returned by the service", async () => {

            const credentials = { email: "notfound@email.com", password: "password" }

            await actions.logIn({ commit }, credentials)

            expect(AuthService.logIn(credentials)).rejects.toEqual({ code: "auth/user-not-found" })
            expect(router.push).not.toHaveBeenCalled()
            expect(commit).toHaveBeenCalledWith("SET_AUTH_ERROR", "User not found. Wrong email or password?")
        })

        it("should commit wrong-password error when returned by the service", async () => {

            const credentials = { email: "test@test.com", password: "wrongPassword" }

            await actions.logIn({ commit }, credentials)

            expect(AuthService.logIn(credentials)).rejects.toEqual({ code: "auth/wrong-password" })
            expect(router.push).not.toHaveBeenCalled()
            expect(commit).toHaveBeenCalledWith("SET_AUTH_ERROR", "User not found. Wrong email or password?")
        })

        it("should commit a global error when something bad happened", async () => {

            AuthService.logIn = jest.fn(() => {
                throw new Error(GLOBAL_ERROR)
            })

            await actions.logIn({ commit }, VALID_CREDENTIALS)

            expect(AuthService.logIn).toHaveBeenCalledWith(VALID_CREDENTIALS)
            expect(router.push).not.toHaveBeenCalled()
            expect(commit).toHaveBeenCalledWith("SET_GLOBAL_ERROR", GLOBAL_ERROR)
        })
    })

    describe("logOut", () => {

        it("should logOut and commit and empty user", async () => {

            await actions.logOut({ commit })

            expect(AuthService.logOut).toHaveBeenCalled()
            expect(commit).toHaveBeenCalledWith("SET_USER", null)
            expect(router.push).toHaveBeenCalledWith(LOGIN_PATH)
        })

        it("should commit a global error when something bad happened", async () => {

            AuthService.logOut = jest.fn(() => {
                throw new Error(GLOBAL_ERROR)
            })

            await actions.logOut({ commit })

            expect(AuthService.logOut).toHaveBeenCalled()
            expect(router.push).not.toHaveBeenCalled()
            expect(commit).toHaveBeenCalledWith("SET_GLOBAL_ERROR", GLOBAL_ERROR)
        })
    })

    describe("setLoggedInUser", () => {

        it("should set the logged in user in the state", async () => {

            await actions.setLoggedInUser({ commit }, MOCK_USER)

            expect(commit).toHaveBeenCalledWith("SET_USER", MOCK_USER)
        })
    })

})