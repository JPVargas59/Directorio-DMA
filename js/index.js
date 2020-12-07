$(() => {
    const doctores = {}
    const doctoresInfo = $('#doctores-info')
    console.log("Loaded")
    db.collection('doctores').onSnapshot(querySnapshot => {
        const doctores = {}
        querySnapshot.forEach(function(doc) {
            const doctor = doc.data()
            doctor.id = doc.id
            doctor.titulo = doctor.titulo ? jsUcfirst(doctor.titulo) : doctor.titulo
            if (!!doctores[doctor.titulo]) {
                doctores[doctor.titulo].push(doctor)
            } else {
                doctores[doctor.titulo] = [doctor]
            }
        });
        for (titulo in doctores) {
            console.log(titulo)
            doctoresInfo.append(`
                <h1 class="text-2xl py-3">${titulo !== "undefined" ? titulo : "Sin información de título"}</h1>
                <div id="doctores-info-${titulo}" class="grid grid-flow-row grid-cols-1 xl:grid-cols-3 sm:grid-cols-2 md:grid-cols-2 gap-4"></div>
            `)
            doctores[titulo].map(doctor => {
                console.log(doctor.foto)
                $(`#doctores-info-${titulo}`).append(`
                <div class="min-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div class="sm:flex sm:items-center px-6 py-4">
                        <img class="block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 sm:h-24 rounded-full" src="${doctor.foto ? doctor.foto : userImgPlaceholder}" alt="Woman's Face">
                        <div class="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                            <p class="text-xl leading-tight">${doctor.nombre}</p>
                            <p class="text-sm leading-tight text-gray-600">${titulo !== "undefined" ? titulo : "Sin información de título"}</p>
                            <p class="text-sm leading-tight text-purple-500">${doctor.direccion ? doctor.direccion : "Sin dirección"}</p>
                            <div class="mt-4">
                                <button class="text-purple-500 hover:text-white hover:bg-purple-500 border border-purple-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal"
                                    onclick="showInfo('${doctor.id}')"
                                >
                                    Más info
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="sm:flex sm:items-center px-6 py-4">
                        <p>${doctor.enfoque ? doctor.enfoque : "Sin información de enfoque"}</p>
                    </div>
                </div>
            `)
            })
        }
    })
})

function showInfo(id) {
    window.location.href = `info.html?id=${id}`
}


