import App from "@/App"
import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from "vue-router"
import router, { HOME_PATH, TASKS_PATH, TASK_ADD_PATH, TASK_EDIT_PATH, LOGIN_PATH, SIGNUP_PATH } from "@/router"
import Vuex from "vuex"
import store from "@/store"
import Vuelidate from 'vuelidate'
import Home from "@/views/home/Home"
import Tasks from "@/views/tasks/Tasks"
import TaskAdd from "@/views/tasks/TaskAdd"
import TaskEdit from "@/views/tasks/TaskEdit"
import Login from "@/views/auth/Login"
import Signup from "@/views/auth/Signup"

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(Vuelidate)

const MOCK_USER = {uid: 98765, email: ""}
store.dispatch("setLoggedInUser", MOCK_USER)

jest.mock("@/firebase")
import { auth } from "@/firebase"

describe("App", () => {

    let wrapper

    beforeEach(async () => {
        wrapper = mount(App, {
            localVue,
            router,
            store
        })
        auth.currentUser = MOCK_USER
    })

    it("should render Home", async () => {
        expect(wrapper.findComponent(Home).exists()).toBe(true)
    })

    it("should redirect to Login when going to Tasks if there's not a current user", async () => {

        auth.currentUser = null

        try {
            await router.push(TASKS_PATH)
        } catch(error) {
            expect(error.message).toEqual(`Redirected when going from "${HOME_PATH}" to "${TASKS_PATH}" via a navigation guard.`)
        }
    })

    it("should render Tasks in /tasks", async () => {

        await router.push(TASKS_PATH)

        expect(router.currentRoute.path).toEqual(TASKS_PATH)
        expect(wrapper.findComponent(Tasks).exists()).toBe(true)
    })

    it("should render TaskAdd in /tasks/add", async () => {

        await router.push(TASK_ADD_PATH)

        expect(router.currentRoute.path).toEqual(TASK_ADD_PATH)
        expect(wrapper.findComponent(TaskAdd).exists()).toBe(true)
    })

    it("should render TaskEdit in /tasks/edit", async () => {

        await router.push(`${TASK_EDIT_PATH}/12345`)

        expect(router.currentRoute.path).toEqual(`${TASK_EDIT_PATH}/12345`)
        expect(wrapper.findComponent(TaskEdit).exists()).toBe(true)
    })

    it("should render Login in /login", async () => {

        await router.push(LOGIN_PATH)

        expect(router.currentRoute.path).toEqual(LOGIN_PATH)
        expect(wrapper.findComponent(Login).exists()).toBe(true)
    })

    it("should render Signup in /signup", async () => {

        await router.push(SIGNUP_PATH)

        expect(router.currentRoute.path).toEqual(SIGNUP_PATH)
        expect(wrapper.findComponent(Signup).exists()).toBe(true)
    })
})