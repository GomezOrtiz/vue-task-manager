import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from "../firebase"
import tasksRoutes from "@/router/tasks.routes"
import authRoutes, { LOGIN_PATH } from "@/router/auth.routes"

Vue.use(VueRouter)

export const HOME_PATH = "/"

const routes = [
  {
    path: HOME_PATH,
    name: 'Home',
    component: () => import('../views/home/Home.vue')
  },
  ...authRoutes,
  ...tasksRoutes,
  { 
    path: '*', 
    name: 'NotFound',
    component: () => import('../components/common/NotFound')
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
