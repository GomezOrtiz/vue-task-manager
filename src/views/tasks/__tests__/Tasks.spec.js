import Tasks from "@/views/tasks/Tasks"
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from "vue-router"
import router from "@/router"
import { TASK_ADD_PATH, TASK_EDIT_PATH } from "@/router/tasks.routes"

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

    let wrapper, tasks, query

    beforeEach(async () => {
        wrapper = shallowMount(Tasks, {
            localVue, router, mocks: {
                $store: mockStore
            }
        })
        await wrapper.vm.$nextTick()
        tasks = wrapper.findAll("li")
        query = wrapper.findAll("input")
    })

    it("add button should point to the expected route", async () => {

        const addLink = wrapper.find("#addTask")
        expect(addLink.attributes("to")).toEqual(TASK_ADD_PATH)
    })

    it("should render with the expected list of tasks", async () => {

        expect(tasks.length).toBe(TASKS.length)
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks.at(i)
            expect(task.text()).toContain(TASKS[i].name)
        }
    })

    it("each task should have the expected number of buttons", async () => {

        for (let i = 0; i < tasks.length; i++) {
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

    it('should filter tasks when query is filled and restore them when query is emptied', async () => {

        query.setValue("2")
        await wrapper.vm.$nextTick()

        tasks = wrapper.findAll("li")
        expect(tasks.length).toBe(1)
        expect(tasks.at(0).text()).toContain("Task 2")

        query.setValue("")
        await wrapper.vm.$nextTick()

        tasks = wrapper.findAll("li")
        expect(tasks.length).toBe(TASKS.length)
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks.at(i)
            expect(task.text()).toContain(TASKS[i].name)
        }
    });
})