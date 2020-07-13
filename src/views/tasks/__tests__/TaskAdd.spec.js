import TaskAdd from "@/views/tasks/TaskAdd"
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuelidate from 'vuelidate'

const localVue = createLocalVue()
localVue.use(Vuelidate)

const mockStore = {
    dispatch: jest.fn()
}

describe("TaskAdd", () => {

    let wrapper, form, input, button

    beforeEach(() => {
        wrapper = shallowMount(TaskAdd, {
            mocks: {
                $store: mockStore
            }, localVue
        })
        form = wrapper.find("form")
        input = wrapper.find("input")
        button = wrapper.find("button")
    })

    it("should render with no errors, a clean input and an empty task name", () => {

        const error = wrapper.find("small")

        expect(error.exists()).toBe(false)
        expect(wrapper.vm.$v.task.name.$dirty).toEqual(false)
        expect(wrapper.vm.$v.task.name.$model).toEqual("")
    })

    it("should pass validation when task name is properly filled", async () => {
        
        input.setValue("New task")
        await wrapper.vm.$nextTick()

        const error = wrapper.find("small")

        expect(wrapper.vm.$v.$invalid).toBe(false)
        expect(error.exists()).toBe(false)
        expect(button.attributes("disabled")).toBeUndefined()
    })

    it("should fail validation when task name is empty", async () => {
        
        input.setValue("")
        await wrapper.vm.$nextTick()

        const error = wrapper.find("small")
        
        expect(wrapper.vm.$v.task.name.required).toBe(false)
        expect(wrapper.vm.$v.$invalid).toBe(true)
        expect(error.text()).toBe("Task name cannot be empty")
        expect(button.attributes("disabled")).toBeDefined()
    })

    it("should fail validation when task name is too short", async () => {

        input.setValue("Task")
        await wrapper.vm.$nextTick()

        const error = wrapper.find("small")

        expect(wrapper.vm.$v.task.name.minLength).toBe(false)
        expect(wrapper.vm.$v.$invalid).toBe(true)
        expect(error.text()).toBe("Task name must have at least 5 characters")
        expect(button.attributes("disabled")).toBeDefined()
    })

    it("should call addTask on submit with the expected task", async () => {

        const expectedTask = { name: "New task"}

        input.setValue(expectedTask.name)
        await wrapper.vm.$nextTick()

        form.trigger("submit")
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.task).toEqual(expectedTask)
        expect(mockStore.dispatch).toHaveBeenCalledWith("addTask", wrapper.vm.task)
    })
})