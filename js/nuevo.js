$(() => {
    const id = window.location.search.split('=')[1]
    $('#header').text(id ? "Editar" : "Nuevo")
    const btnGuardar = $('#btnGuardar')
    const btnBorrar = $('#btnBorrar')

    const nombreInput = $('#nombre')
    const correoInput  = $('#correo')
    const costoInput = $('#costo')
    const telefonoInput = $('#telefono')
    const direccionInput = $('#direccion')
    const paginaInput = $('#pagina')
    const cvInput = $('#cv')
    const enfoqueInput = $('#enfoque')
    const tituloInput = $('#titulo')
    let fotoInput = $('#foto')
    let fotoValue = "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"



    if (id) {
        btnBorrar.show()
        db.doc(`doctores/${id}`).onSnapshot(doc => {
            const {nombre, correo, costo, telefono, direccion, pagina, cv, enfoque, foto, titulo} = doc.data()
            nombreInput.val(nombre)
            correoInput.val(correo)
            costoInput.val(costo)
            telefonoInput.val(telefono)
            direccionInput.val(direccion)
            paginaInput.val(pagina)
            cvInput.val(cv)
            enfoqueInput.val(enfoque)
            tituloInput.val(titulo)
            fotoValue = foto
            $('#userImg').attr("src",foto)
        })
    }

    btnGuardar.click(() => {
        if (id) {
            db.doc(`doctores/${id}`).update({
                nombre: nombreInput.val(),
                correo: correoInput.val(),
                costo: costoInput.val(),
                telefono: telefonoInput.val(),
                direccion: direccionInput.val(),
                pagina: paginaInput.val(),
                cv: cvInput.val(),
                enfoque: enfoqueInput.val(),
                titulo: tituloInput.val(),
                foto: fotoValue ? fotoValue : userImgPlaceholder
            })
                .then(() => {
                    alert('Guardado exitosamente')
                    window.location.href = `nuevo.html?id=${id}`
                })
                .catch((e) => {
                    console.log(e)
                    alert('ERROR, Guardado falló')
                })
        } else {
            const ref = db.collection('doctores').doc()
            db.doc(`doctores/${ref.id}`).set({
                nombre: nombreInput.val(),
                correo: correoInput.val(),
                costo: costoInput.val(),
                telefono: telefonoInput.val(),
                direccion: direccionInput.val(),
                pagina: paginaInput.val(),
                cv: cvInput.val(),
                enfoque: enfoqueInput.val(),
                foto: fotoValue
            })
                .then(() => {
                    alert('Guardado exitosamente')
                    window.location.href = `nuevo.html?id=${ref.id}`
                })
                .catch((e) => {
                    console.log(e)
                    alert('ERROR, Guardado falló')
                })
        }
    })

    btnBorrar.click(() => {
        db.doc(`doctores/${id}`).delete()
            .then(() => {
                alert('Eliminado con éxito')
                window.location.href = 'nuevo.html'
            })
    })

    fotoInput.change(() => {
        const file = fotoInput.prop('files')[0]
        const storageUserRef = storageRef.child(`images/${id}`)
        storageUserRef.put(file).then(snapshot => {
            console.log(snapshot)
            snapshot.ref.getDownloadURL().then(url => {
                fotoValue = url
                $('#userImg').src = url
            })

        })
        console.log(file)
        /*if (id) {
            const foto = prompt("Pega aquí el link de la foto")
            fotoValue = foto ? foto : "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg";
            $('#userImg').attr("src",fotoValue)
        } else {
            alert('Primero guarda los datos antes de añadir una foto')
        }*/
    })


})
