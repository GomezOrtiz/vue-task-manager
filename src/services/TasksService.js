import { db } from "@/firebase"

const TasksService = {

    async findAll(userId) {
        const docs = await db.collection(`tasks-${userId}`).get()
        const tasks = []
        docs.forEach(doc =>
            tasks.push({
                ...doc.data(),
                id: doc.id,
            })
        )
        return tasks
    },

    async findOne(id, userId) {
        const doc = await db.collection(`tasks-${userId}`).doc(id).get()
        const task = {
            ...doc.data(),
            id
        }
        return task
    },

    async update(task, userId) {
        await db.collection(`tasks-${userId}`).doc(task.id).update(task)
    },

    async create(task, userId) {
        await db.collection(`tasks-${userId}`).add(task)
    },

    async delete(taskId, userId) {
        await db.collection(`tasks-${userId}`).doc(taskId).delete()
    }
}

export default TasksService