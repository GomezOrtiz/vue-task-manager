const DOCS = [
    {
        id: "12345",
        data() {
            return {
                name: "Task 1"
            }
        }
    },
    {
        id: "54321",
        data() {
            return {
                name: "Task 2"
            }
        }
    }
]

const db = {
    collection: jest.fn(name => {
        return {
            docId: "",
            doc: jest.fn(function(id) {
                this.docId = id
                return this
            }),
            get: jest.fn(function() {
                return new Promise((resolve, reject) => {
                    this.docId ? resolve(DOCS[0]) : resolve(DOCS)
                })
            }),
            update: jest.fn(),
            add: jest.fn(),
            delete: jest.fn()
        }
    })
}

const auth = {
    currentUser: { uid: "12345", email: ""},
    createUserWithEmailAndPassword: jest.fn(function(email, password) {
        return new Promise((resolve, reject) => {
            resolve({ uid: this.currentUser.uid, email })
        })
    }),
    signInWithEmailAndPassword: jest.fn(function(email, password) {
        return new Promise((resolve, reject) => {
            resolve({ uid: this.currentUser.uid, email })
        })
    }),
    signOut: jest.fn(),
    getCurrentUser: jest.fn(function() {
        return this.currentUser
    })
}

module.exports = { db, auth }