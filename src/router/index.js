import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from "../firebase"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/auth/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login.vue')
  },
  {
    path: "/tasks",
    name: 'Tasks',
    component: () => import(/* webpackChunkName: "tasks" */ '../views/tasks/Tasks.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tasks/add',
    name: 'TaskAdd',
    component: () => import(/* webpackChunkName: "taskAdd" */ '../views/tasks/TaskAdd.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tasks/edit/:id',
    name: 'TaskEdit',
    component: () => import(/* webpackChunkName: "taskEdit" */ '../views/tasks/TaskEdit.vue'),
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
        path: '/login',
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
