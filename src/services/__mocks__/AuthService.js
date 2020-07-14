export const MOCK_USER = {
    uid: "12345",
    email: "test@ŧest.com"
}

export const VALID_CREDENTIALS = {
    email: "test@ŧest.com",
    password: "password",
    repeatPassword: "password"
}

const AuthService = {
    signUp: jest.fn(function (credentials) {
        return new Promise((resolve, reject) => {
            credentials === VALID_CREDENTIALS ? resolve(MOCK_USER) : reject({ code: "auth/email-already-in-use"})
        })
    }),
    logIn: jest.fn(function (credentials) {
        return new Promise((resolve, reject) => {
            if(credentials.email.includes("notfound")) {
                reject({ code: "auth/user-not-found"})
            } else if(credentials.password.includes("wrong")) {
                reject({ code: "auth/wrong-password"})
            } else {
                resolve(MOCK_USER)
            }
        })
    }),
    logOut: jest.fn(),
    getCurrentUser: jest.fn(function() {
        return MOCK_USER
    })
}

export default AuthService