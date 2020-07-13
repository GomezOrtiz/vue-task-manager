import AuthService from "@/services/AuthService"

const CREDENTIALS = {
    email: "test@ŧest.com",
    password: "password"
}

jest.mock('@/firebase')
import { auth } from "@/firebase"

describe("AuthService", () => {

    it("should sign up", async () => {

        const result = await AuthService.signUp(CREDENTIALS)

        expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(CREDENTIALS.email, CREDENTIALS.password)
        expect(result).toEqual({ uid: auth.currentUser.uid, email: CREDENTIALS.email })
    })

    it("should log in", async () => {

        const result = await AuthService.logIn(CREDENTIALS)

        expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith(CREDENTIALS.email, CREDENTIALS.password)
        expect(result).toEqual({ uid: auth.currentUser.uid, email: CREDENTIALS.email })
    })

    it("should log out", async () => {

        await AuthService.logOut()

        expect(auth.signOut).toHaveBeenCalled()
    })

    it("should get current user", () => {

        const result = AuthService.getCurrentUser()

        expect(result).toEqual(auth.currentUser)
    })
})