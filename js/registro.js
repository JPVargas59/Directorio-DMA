$(() => {
    const email = $('#email')
    const password = $('#password')
    const repeatPassword = $('#repeat-password')

    $('#crearBtn').click(() => {
        console.log(email.val(), password.val(), repeatPassword.val())
        if (password.val() === repeatPassword.val()) {
            auth.createUserWithEmailAndPassword(email.val(), password.val())
                .then((res) => {
                    const user = res.user
                    db.doc(`users/${user.uid}`).set({
                        role: 'none',
                        email: user.email
                    })
                        .then(() => {
                            alert("cuenta creada")
                            window.location.href = 'login.html'
                        })
                })
                .catch(e => {
                    console.log(e)
                    alert('Ocurrió un error')
                })
        }
    })
})
