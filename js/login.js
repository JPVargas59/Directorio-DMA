$(() => {
    const user = $('#username')
    const password = $('#password')

    $('#signInBtn').click(() => {
        console.log("clicked")
        auth.signInWithEmailAndPassword(user.val(), password.val())
            .then((user) => {
                console.log('Signed In')
                user = user.user
                db.doc(`users/${user.uid}`).onSnapshot(doc => {
                    const role = doc.data().role
                    if (role === 'admin') {
                        window.location.href = "admin.html"
                    } else if (role === 'user') {
                        window.location.href = "index.html"
                    } else {
                        alert('No tienes permisos de entrar a la página.')
                    }
                })
            })
    })
})


