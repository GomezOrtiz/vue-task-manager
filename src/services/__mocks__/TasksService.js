export const MOCK_TASKS = [
    { id: "12345", name: "Task 1" },
    { id: "56789", name: "Task 2" }
]

const TasksService = {
    findAll: jest.fn(function (userId) {
        return new Promise((resolve, reject) => {
            resolve(MOCK_TASKS)
        })
    }),
    findOne: jest.fn(function (id, userId) {
        return new Promise((resolve, reject) => {
            resolve(MOCK_TASKS.find(task => task.id === id))
        })
    }),
    update: jest.fn(),
    create: jest.fn(),
    delete: jest.fn()
}

export default TasksService