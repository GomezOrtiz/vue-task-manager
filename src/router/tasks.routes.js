export const TASKS_PATH = "/tasks"
export const TASK_ADD_PATH = "/tasks/add"
export const TASK_EDIT_PATH = "/tasks/edit"

const tasksRoutes = [
    {
        path: TASKS_PATH,
        name: 'Tasks',
        component: () => import('@/views/tasks/Tasks.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: TASK_ADD_PATH,
        name: 'TaskAdd',
        component: () => import('@/views/tasks/TaskAdd.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: `${TASK_EDIT_PATH}/:id`,
        name: 'TaskEdit',
        component: () => import('@/views/tasks/TaskEdit.vue'),
        meta: { requiresAuth: true }
    }
]

export default tasksRoutes