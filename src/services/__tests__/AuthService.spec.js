import AuthService from "@/services/AuthService"

const CREDENTIALS = {
    email: "test@ŧest.com",
    password: "password"
}
const UID = "12345"

jest.mock('@/firebase')
import { auth } from "@/firebase"

describe("AuthService", () => {

    it("should sign up", async () => {

        const result = await AuthService.signUp(CREDENTIALS)

        expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(CREDENTIALS.email, CREDENTIALS.password)
        expect(result).toEqual({ uid: UID, email: CREDENTIALS.email })
    })

    it("should log in", async () => {

        const result = await AuthService.logIn(CREDENTIALS)

        expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith(CREDENTIALS.email, CREDENTIALS.password)
        expect(result).toEqual({ uid: UID, email: CREDENTIALS.email })
    })

    it("should log out", async () => {

        await AuthService.logOut()

        expect(auth.signOut).toHaveBeenCalled()
    })
})