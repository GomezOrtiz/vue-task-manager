import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from "../firebase"

Vue.use(VueRouter)

export const HOME_PATH = "/"
export const SIGNUP_PATH = "/signup"
export const LOGIN_PATH = "/login"
export const TASKS_PATH = "/tasks"
export const TASK_ADD_PATH = "/tasks/add"
export const TASK_EDIT_PATH = "/tasks/edit"

const routes = [
  {
    path: HOME_PATH,
    name: 'Home',
    component: () => import('../views/home/Home.vue')
  },
  {
    path: SIGNUP_PATH,
    name: 'Signup',
    component: () => import('../views/auth/Signup.vue')
  },
  {
    path: LOGIN_PATH,
    name: 'Login',
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: TASKS_PATH,
    name: 'Tasks',
    component: () => import('../views/tasks/Tasks.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: TASK_ADD_PATH,
    name: 'TaskAdd',
    component: () => import('../views/tasks/TaskAdd.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: `${TASK_EDIT_PATH}/:id`,
    name: 'TaskEdit',
    component: () => import('../views/tasks/TaskEdit.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.currentUser) {
      next({
        path: LOGIN_PATH,
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
