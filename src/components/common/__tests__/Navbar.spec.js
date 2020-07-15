import Navbar from "@/components/common/Navbar"
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from "vue-router"
import { TASKS_PATH } from "@/router/tasks.routes"
import { LOGIN_PATH, SIGNUP_PATH } from "@/router/auth.routes"

const localVue = createLocalVue()
localVue.use(VueRouter)

const loggedInStore = {
    getters: {
        isLoggedInUser: true
    },
    dispatch: jest.fn()
}

const notLoggedInStore = {
    getters: {
        isLoggedInUser: false
    },
    dispatch: jest.fn()
}

describe("Navbar", () => {

    let loggedInWrapper, notLoggedInWrapper

    beforeEach(() => {
        loggedInWrapper = shallowMount(Navbar, {
            mocks: {
                $store: loggedInStore
            }, localVue
        })
        notLoggedInWrapper = shallowMount(Navbar, {
            mocks: {
                $store: notLoggedInStore
            }, localVue
        })
    })

    it("should render with the expected links when logged in", () => {

        const links = loggedInWrapper.findAll(".nav-link")

        expect(links.length).toBe(2)
        expect(links.at(0).text()).toContain("Tasks")
        expect(links.at(0).attributes("to")).toEqual(TASKS_PATH)
        expect(links.at(1).text()).toContain("Log out")
    })

    it("should call logOut when clicking on Log out button", async () => {

        const logOut = loggedInWrapper.findAll(".nav-link").at(1)

        logOut.trigger("click")
        await loggedInWrapper.vm.$nextTick()

        expect(loggedInStore.dispatch).toHaveBeenCalledWith("logOut")
    })

    it("should render with the expected links when not logged in", () => {

        const links = notLoggedInWrapper.findAll(".nav-link")

        expect(links.length).toBe(3)
        expect(links.at(0).text()).toContain("Tasks")
        expect(links.at(0).attributes("to")).toEqual(TASKS_PATH)
        expect(links.at(1).text()).toContain("Log in")
        expect(links.at(1).attributes("to")).toEqual(LOGIN_PATH)
        expect(links.at(2).text()).toContain("Sign up")
        expect(links.at(2).attributes("to")).toEqual(SIGNUP_PATH)
    })
})