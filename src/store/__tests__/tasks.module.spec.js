import { mutations, getters, actions } from "@/store/tasks.module"

const GLOBAL_ERROR = "Something bad happened"

export const MOCK_USER = {
    uid: "12345",
    email: "test@ŧest.com"
}
getters.user = MOCK_USER

const dispatch = jest.fn()

jest.mock("@/services/TasksService")
jest.mock("@/router", () => {
    return {
        TASKS_PATH: "/tasks",
        push: jest.fn()
    }
})

import TasksService, { MOCK_TASKS } from "@/services/TasksService"
import router, { TASKS_PATH } from "@/router"

describe("Task store module", () => {

    let state, commit

    beforeEach(() => {
        state = {
            tasks: [],
            task: {},
        }
        commit = jest.fn()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("SET_TASKS", () => {
        it("should set all tasks in the state", () => {

            mutations.SET_TASKS(state, MOCK_TASKS)

            expect(state).toEqual({ tasks: MOCK_TASKS, task: {} })
            expect(getters.tasks(state)).toEqual(MOCK_TASKS)
        })
    })

    describe("SET_TASK", () => {
        it("should set one task in the state", () => {

            mutations.SET_TASK(state, MOCK_TASKS[0])

            expect(state).toEqual({ tasks: [], task: MOCK_TASKS[0] })
            expect(getters.task(state)).toEqual(MOCK_TASKS[0])
        })
    })

    describe("getTasks", () => {
        it("should get all tasks and commit them", async () => {

            await actions.getTasks({ getters, commit })

            expect(TasksService.findAll).toHaveBeenCalledWith(MOCK_USER.uid)
            expect(commit).toHaveBeenCalledWith("SET_TASKS", MOCK_TASKS)
        })

        it("should commit a global error if something failed", async () => {

            TasksService.findAll = jest.fn(() => {
                throw new Error(GLOBAL_ERROR)
            })

            await actions.getTasks({ getters, commit })

            expect(TasksService.findAll).toHaveBeenCalledWith(MOCK_USER.uid)
            expect(commit).toHaveBeenCalledWith("SET_GLOBAL_ERROR", GLOBAL_ERROR)
        })
    })

    describe("getTask", () => {
        it("should get one tasks and commit it", async () => {

            await actions.getTask({ getters, commit }, MOCK_TASKS[0].id)

            expect(TasksService.findOne).toHaveBeenCalledWith(MOCK_TASKS[0].id, MOCK_USER.uid)
            expect(commit).toHaveBeenCalledWith("SET_TASK", MOCK_TASKS[0])
        })

        it("should commit a global error if something failed", async () => {

            TasksService.findOne = jest.fn(() => {
                throw new Error(GLOBAL_ERROR)
            })

            await actions.getTask({ getters, commit }, MOCK_TASKS[0].id)

            expect(TasksService.findOne).toHaveBeenCalledWith(MOCK_TASKS[0].id, MOCK_USER.uid)
            expect(commit).toHaveBeenCalledWith("SET_GLOBAL_ERROR", GLOBAL_ERROR)
        })
    })

    describe("editTask", () => {
        it("should call update with the proper task", async () => {

            await actions.editTask({ getters, commit }, MOCK_TASKS[0])

            expect(TasksService.update).toHaveBeenCalledWith(MOCK_TASKS[0], MOCK_USER.uid)
            expect(router.push).toHaveBeenCalledWith(TASKS_PATH)
        })

        it("should commit a global error if something failed", async () => {

            TasksService.update = jest.fn(() => {
                throw new Error(GLOBAL_ERROR)
            })

            await actions.editTask({ getters, commit }, MOCK_TASKS[0])

            expect(TasksService.update).toHaveBeenCalledWith(MOCK_TASKS[0], MOCK_USER.uid)
            expect(commit).toHaveBeenCalledWith("SET_GLOBAL_ERROR", GLOBAL_ERROR)
        })
    })

    describe("addTask", () => {
        it("should call create with the proper task", async () => {

            const newTask = {id: "2468", name: "New task"}

            await actions.addTask({ getters, commit }, newTask)

            expect(TasksService.create).toHaveBeenCalledWith(newTask, MOCK_USER.uid)
            expect(router.push).toHaveBeenCalledWith(TASKS_PATH)
        })

        it("should commit a global error if something failed", async () => {

            const newTask = {id: "2468", name: "New task"}

            TasksService.create = jest.fn(() => {
                throw new Error(GLOBAL_ERROR)
            })

            await actions.addTask({ getters, commit }, newTask)

            expect(TasksService.create).toHaveBeenCalledWith(newTask, MOCK_USER.uid)
            expect(commit).toHaveBeenCalledWith("SET_GLOBAL_ERROR", GLOBAL_ERROR)
        })
    })

    describe("deleteTask", () => {
        it("should call delete with the proper taskId", async () => {

            await actions.deleteTask({ getters, commit, dispatch }, MOCK_TASKS[0].id)

            expect(TasksService.delete).toHaveBeenCalledWith(MOCK_TASKS[0].id, MOCK_USER.uid)
            expect(dispatch).toHaveBeenCalledWith("getTasks")
        })

        it("should commit a global error if something failed", async () => {

            TasksService.delete = jest.fn(() => {
                throw new Error(GLOBAL_ERROR)
            })

            await actions.deleteTask({ getters, commit, dispatch }, MOCK_TASKS[0].id)

            expect(TasksService.delete).toHaveBeenCalledWith(MOCK_TASKS[0].id, MOCK_USER.uid)
            expect(commit).toHaveBeenCalledWith("SET_GLOBAL_ERROR", GLOBAL_ERROR)
        })
    })

})