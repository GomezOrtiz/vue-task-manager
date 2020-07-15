export const SIGNUP_PATH = "/signup"
export const LOGIN_PATH = "/login"

const authRoutes = [
    {
        path: SIGNUP_PATH,
        name: 'Signup',
        component: () => import('@/views/auth/Signup.vue')
    },
    {
        path: LOGIN_PATH,
        name: 'Login',
        component: () => import('@/views/auth/Login.vue')
    }
]

export default authRoutes
