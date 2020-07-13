import Home from "@/views/home/Home"
import { shallowMount } from '@vue/test-utils'

describe("Home", () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(Home)
    })

    it("renders", () => {
        expect(wrapper.exists()).toBe(true)
    })
})