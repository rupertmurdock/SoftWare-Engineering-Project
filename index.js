var firebaseConfig = {
    apiKey: "AIzaSyBDZFqhkECAYqdxUDEUF96Rb9OCUh6Jl64",
    authDomain: "game-1-website.firebaseapp.com",
    projectId: "game-1-website",
    storageBucket: "game-1-website.appspot.com",
    messagingSenderId: "483277766163",
    appId: "1:483277766163:web:55358a49073017e46609e6"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()

function test(){
    alert('test')
}

function signUp(){
    //get input
    username = document.getElementById("username").value;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    //varify input
    if(username === null){
        alert('what\'s your name?')
        return
    }

    //sign up
    auth.createUserWithEmailAndPassword(email, password)
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
    alert('test 2')
}

function signIn(){
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

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