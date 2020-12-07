var firebaseConfig = {
    apiKey: "AIzaSyBc9h2RnDizUccZoFCh_SunS_PzLl-5dxE",
    authDomain: "directorio-dma.firebaseapp.com",
    databaseURL: "https://directorio-dma.firebaseio.com",
    projectId: "directorio-dma",
    storageBucket: "directorio-dma.appspot.com",
    messagingSenderId: "481172498189",
    appId: "1:481172498189:web:81277b56667b487e697244",
    measurementId: "G-K15F8TK5PJ"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebase.firestore()
const storageRef = firebase.storage().ref();

const userImgPlaceholder = "https://cdn3.f-cdn.com/contestentries/1269942/15600440/5a991c82be987_thumb900.jpg"
let userType = undefined
$(() => {
    auth.onAuthStateChanged(user => {
        if (!user && window.location.pathname !== "/login.html" && window.location.pathname !== "/registro.html" ) {
            window.location.href = "login.html"
        } else {
            db.doc(`users/${user.uid}`).onSnapshot(doc => {
                userType = doc.data().role
                if (userType === "admin") {
                    $('#adminBtn').show()
                } else {
                    $('#adminBtn').hide()
                }
            })
        }
    })
    $('#logOutBtn').click(() => {
        logout()
            .then(() => {
                window.location.href = 'login.html'
            })
    })

    $('#adminBtn').click(() => {
        window.location.href = "admin.html"
    })

    $('#forgotPassword').click(() => {
        const mail = prompt('Introduce tu correo')
        if (mail) {
            auth.sendPasswordResetEmail(mail)
                .then(() => {
                    alert('Se ha enviado un correo para reestablecer tu contraseña')
                })
        }
    })
})

function jsUcfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function logout() {
    return auth.signOut()
}
