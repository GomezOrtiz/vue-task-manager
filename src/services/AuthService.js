import { auth } from "@/firebase"

const AuthService = {

    async signUp(credentials) {
        const { uid, email } = await auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
        return { uid, email }
    },

    async logIn(credentials) {
        const { uid, email } = await auth.signInWithEmailAndPassword(credentials.email, credentials.password)
        return { uid, email }
    },

    async logOut() {
        await auth.signOut()
    },

    getCurrentUser() {
        return auth.currentUser
    }
}

export default AuthService