$(() => {
    db.collection('doctores').onSnapshot(querySnapshot => {
        querySnapshot.forEach(function(doc) {
            const doctor = doc.data()
            $('#doctores-info').append(`
                <div class="min-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div class="sm:flex sm:items-center px-6 py-4">
                        <img class="block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 sm:h-24 rounded-full" src="${doctor.foto ? doctor.foto : userImgPlaceholder}" alt="Imagen perfil">
                        <div class="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                            <p class="text-xl leading-tight">${doctor.nombre}</p>
                            <p class="text-sm leading-tight text-gray-600">${doctor.titulo ? doctor.titulo : "Sin información de título"}</p>
                            <p class="text-sm leading-tight text-purple-500">${doctor.direccion ? doctor.direccion : "Sin dirección"}</p>
                            <div class="mt-4">
                                <button class="text-purple-500 hover:text-white hover:bg-purple-500 border border-purple-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal"
                                    onclick="edit('${doc.id}')"
                                >
                                    Editar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="sm:flex sm:items-center px-6 py-4">
                        <p>${doctor.enfoque ? doctor.enfoque : "Sin información de enfoque"}</p>
                    </div>
                </div>
            `)
        });
    })

    $('#nuevoBtn').click(() => {
        window.location.href = "nuevo.html"
    })
})


function edit(id) {
    window.location.href = `nuevo.html?id=${id}`
}
