import Home from "@/views/home/Home"
import { mount } from '@vue/test-utils'

describe("Home", () => {

    let wrapper

    beforeEach(() => {
        wrapper = mount(Home)
    })

    it("renders", () => {
        expect(wrapper.exists()).toBe(true)
    })
})