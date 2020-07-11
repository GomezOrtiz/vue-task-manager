import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC7dAQpOiy5iCqeCXwDkAe3ODVRDlZepiw",
    authDomain: "vue-crud-4cc34.firebaseapp.com",
    databaseURL: "https://vue-crud-4cc34.firebaseio.com",
    projectId: "vue-crud-4cc34",
    storageBucket: "vue-crud-4cc34.appspot.com",
    messagingSenderId: "856475327215",
    appId: "1:856475327215:web:95dcbf351dd392acdad91a"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()

export { db, auth }