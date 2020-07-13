import TasksService from "@/services/TasksService"

const USER_ID = "userId"
const TASKS = [
    { id: "12345", name: "Task 1" },
    { id: "54321", name: "Task 2" }
]

jest.mock('@/firebase')
import { db } from "@/firebase"

describe("TaskService", () => {

    it("should find all tasks", async () => {

        const result = await TasksService.findAll(USER_ID)

        expect(db.collection).toHaveBeenCalledWith(`tasks-${USER_ID}`)
        const collection = getCollectionResultValue(db.collection)
        expect(collection.get).toHaveBeenCalled()
        expect(result).toEqual(TASKS)
    })

    it("should find one task", async () => {

        const result = await TasksService.findOne(TASKS[0].id, USER_ID)

        expect(db.collection).toHaveBeenCalledWith(`tasks-${USER_ID}`)
        const collection = getCollectionResultValue(db.collection)
        expect(collection.doc).toHaveBeenCalledWith(TASKS[0].id)
        expect(collection.get).toHaveBeenCalled()
        expect(result).toEqual(TASKS[0])
    })

    it("should update a task", async () => {

        await TasksService.update(TASKS[0], USER_ID)

        expect(db.collection).toHaveBeenCalledWith(`tasks-${USER_ID}`)
        const collection = getCollectionResultValue(db.collection)
        expect(collection.doc).toHaveBeenCalledWith(TASKS[0].id)
        expect(collection.update).toHaveBeenCalledWith(TASKS[0])
    })

    it("should create a task", async () => {

        const newTask = { id: "56789", name: "New task"}
        await TasksService.create(newTask, USER_ID)

        expect(db.collection).toHaveBeenCalledWith(`tasks-${USER_ID}`)
        const collection = getCollectionResultValue(db.collection)
        expect(collection.add).toHaveBeenCalledWith(newTask)
    })

    it("should delete a task", async () => {

        await TasksService.delete(TASKS[0].id, USER_ID)

        expect(db.collection).toHaveBeenCalledWith(`tasks-${USER_ID}`)
        const collection = getCollectionResultValue(db.collection)
        expect(collection.doc).toHaveBeenCalledWith(TASKS[0].id)
        expect(collection.delete).toHaveBeenCalled()
    })
})

const getCollectionResultValue = (collection) => {
    return collection.mock.results[db.collection.mock.results.length - 1].value
}