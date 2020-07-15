import NotFound from "@/components/common/NotFound"
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from "vue-router"

const localVue = createLocalVue()
localVue.use(VueRouter)

describe("NotFound", () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(NotFound, {
            localVue
        })
    })

    it("renders", () => {
        expect(wrapper.exists()).toBe(true)
    })
})