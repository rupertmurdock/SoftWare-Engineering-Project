// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDZFqhkECAYqdxUDEUF96Rb9OCUh6Jl64",
    authDomain: "game-1-website.firebaseapp.com",
    databaseURL: "https://game-1-website-default-rtdb.firebaseio.com",
    projectId: "game-1-website",
    storageBucket: "game-1-website.appspot.com",
    messagingSenderId: "483277766163",
    appId: "1:483277766163:web:55358a49073017e46609e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const database = getDatabase()

function test(){
    alert('test')
}


function signUp(){
    //get input
    username = document.getElementById("username").value
    email = document.getElementById("email").value
    password = document.getElementById("password").value

    //sign up
    createUserWithEmailAndPassword(auth, email, password)
    .then(function(){
        var user = auth.currentUser
        var database_ref = database.ref()
        
        var user_data = {
            username : username,
            email : email,
            last_sign_in : Date.now(),

            chess_win : 0,
            chess_lose : 0,
            chess_draw : 0,
        }

        database_ref.child('users/' + user.uid).set(user_data)

        alert('Sign Up Successful')
    })
    .catch(function(error){
        var error_code = error.code
        var error_massage = error.message

        alert(error_massage)
    })
}

function signIn(){
    email = document.getElementById("email").value
    password = document.getElementById("password").value

    auth.signInWithEmailAndPassword(email, password)
    .then(function(){
        var user = auth.currentUser
        var database_ref = database.ref()
        
        var user_data = {
            last_sign_in : Date.now(),
        }

        database_ref.child('users/' + user.uid).update(user_data)

        alert('Sign In Successful')
    })
    .catch(function(error){
        var error_code = error.code
        var error_massage = error.message

        alert(error_massage)
    })
}