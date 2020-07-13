import App from "@/App"
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from "vue-router"

const localVue = createLocalVue()
localVue.use(VueRouter)

describe("App", () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(App, {
            localVue
        })
    })

    it("should render", () => {
        expect(wrapper.exists()).toBe(true)
    })
})