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

const UID = "12345"

const db = {
    collection: jest.fn(name => {
        return {
            taskId: "",
            doc: jest.fn(function(id) {
                this.taskId = id
                return this
            }),
            get: jest.fn(function() {
                return new Promise((resolve, reject) => {
                    this.taskId ? resolve(DOCS[0]) : resolve(DOCS)
                })
            }),
            update: jest.fn(),
            add: jest.fn(),
            delete: jest.fn()
        }
    })
}

const auth = {
    createUserWithEmailAndPassword: jest.fn(function(email, password) {
        return new Promise((resolve, reject) => {
            resolve({ uid: UID, email })
        })
    }),
    signInWithEmailAndPassword: jest.fn(function(email, password) {
        return new Promise((resolve, reject) => {
            resolve({ uid: UID, email })
        })
    }),
    signOut: jest.fn()
}

module.exports = { db, auth }