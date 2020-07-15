import { shallowMount } from "@vue/test-utils"
import ErrorToast from "@/components/common/ErrorToast"

jest.useFakeTimers()

describe('Name of the group', () => {

    let wrapper, toast, button, errorDiv

    beforeEach(() => {
        wrapper = shallowMount(ErrorToast, {
            propsData: {
                error: "Some error"
            }
        })
        toast = wrapper.find(".toast")
        button = wrapper.find("button")
        errorDiv = wrapper.find(".toast-body")
    });

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should render with an error div if there's an error", () => {
        expect(errorDiv.text()).toEqual("Some error")
    });

    it("should render empty if there isn't error", () => {
        wrapper = shallowMount(ErrorToast, {
            propsData: {
                error: ""
            }
        })
        toast = wrapper.find(".toast")

        expect(wrapper.exists()).toBe(true)
        expect(toast.exists()).toBe(false)
    });

    it('should stop showing after 3000 milliseconds', async () => {

        expect(setTimeout).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000);

        expect(wrapper.vm.show).toBe(true)
        expect(toast.classes()).toContain("show")

        jest.runAllTimers()
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.show).toBe(false)
        expect(toast.classes()).not.toContain("show")
    });

    it('should not show after clicking X button', async () => {

        expect(wrapper.vm.show).toBe(true)
        expect(toast.classes()).toContain("show")

        button.trigger("click")
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.show).toBe(false)
        expect(toast.classes()).not.toContain("show")
    });
});