$(() => {
    const doctorID = window.location.search.split('=')[1]
    db.doc(`doctores/${doctorID}`).onSnapshot(snapshot => {
        const doctor = snapshot.data()
        $('#doctor-info').append(`
            <div class="min-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-5">
                <div class="sm:flex sm:items-center px-6 py-4">
                    <img class="block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 sm:h-24 rounded-full"  src="${doctor.foto ? doctor.foto : userImgPlaceholder}" alt="Woman's Face">
                    <div class="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                        <p class="text-xl leading-tight">${doctor.nombre}</p>
                        <p class="text-sm leading-tight text-gray-600">${doctor.titulo ? doctor.titulo : "Sin información de título"}</p>
                        <p class="text-sm leading-tight text-purple-500">${doctor.direccion ? doctor.direccion : "Sin dirección"}</p>
                    </div>
                </div>
                <ul class="px-6 py-4">
                    <p><b>Enfoque: </b>${doctor.enfoque ? doctor.enfoque : "Sin información de enfoque"}</p>
                    <p><b>Teléfono: </b>${doctor.telefono ? doctor.telefono : "Sin información de telefono"}</p>
                    <p><b>Correo: </b>${doctor.correo ? doctor.correo : "Sin información de correo"}</p>
                    <p><b>Costo: </b>${doctor.costo ? doctor.costo : "Sin información de costo"}</p>
                    <p><b>CV:</b> <a class="text-blue-600" href="${doctor.cv}" target="_blank">${doctor.cv ? doctor.cv : 'Abrir CV'}</a></p>
                    <p><b>Página: </b><a class="text-blue-600" href="${doctor.pagina}">${doctor.pagina ? doctor.pagina : "Sin información de pagina"}</a></p>
                </ul>
            </div>
        `)
    })
})
