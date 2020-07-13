import Tasks from "@/views/tasks/Tasks"
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from "vue-router"
import router, { TASK_ADD_PATH, TASK_EDIT_PATH } from "@/router"

const localVue = createLocalVue()
localVue.use(VueRouter)

const TASKS = [
    { id: 1, name: "Task 1" },
    { id: 2, name: "Task 2" },
]

const mockStore = {
    getters: {
        tasks: TASKS
    },
    dispatch: jest.fn()
}

describe("Tasks", () => {

    let wrapper, tasks

    beforeEach(async () => {
        wrapper = shallowMount(Tasks, {
            localVue, router, mocks: {
                $store: mockStore
            }
        })
        await wrapper.vm.$nextTick()
        tasks = wrapper.findAll("li")
    })

    it("add button should point to the expected route", async () => {

        const addLink = wrapper.findAll("router-link-stub").at(0)
        expect(addLink.attributes("to")).toEqual(TASK_ADD_PATH)
    })

    it("should render with the expected list of tasks", async () => {

        expect(tasks.length).toBe(TASKS.length)
        for(let i = 0; i < tasks.length; i++) {
            const task = tasks.at(i)
            expect(task.text()).toContain(TASKS[i].name)
        }
    })

    it("each task should have the expected number of buttons", async () => {

        for(let i = 0; i < tasks.length; i++) {
            const task = tasks.at(i)

            const buttons = task.findAll("button")
            expect(buttons.length).toBe(2)
        }
    })

    it("edit button should point to the expected route", async () => {

        const task = tasks.at(0)

        const editLink = task.find("router-link-stub")
        expect(editLink.attributes("to")).toEqual(`${TASK_EDIT_PATH}/${TASKS[0].id}`)
    })

    it("delete button should call deleteTask", async () => {

        const task = tasks.at(0)

        const deleteButton = task.findAll("button").at(1)
        deleteButton.trigger("click")
        await wrapper.vm.$nextTick()

        expect(mockStore.dispatch).toHaveBeenCalledWith("deleteTask", TASKS[0].id)
    })
})