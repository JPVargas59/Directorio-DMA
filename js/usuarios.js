$(() => {
    $('#approveBtn').on('click',{user: 'A01066303'}, (event) => {
        console.log(event.data.user)
    })

    const users = $('#users')

    db.collection('users').onSnapshot(querySnapshot => {
        users.empty()
        querySnapshot.forEach(snapshot => {
            const user = snapshot.data()
            user.id = snapshot.id
            users.append(`
                <div class="clearfix">
                    <p class="text-xl mr-10 float-left">${user.role} - ${user.email}</p>
                    <button id="admin-${user.id}" class="float-right inline rounded px-4 py-2 bg-yellow-600 text-white">Admin</button>
                    <button id="user-${user.id}" class="float-right inline rounded px-4 py-2 bg-blue-600 text-white">Usuario</button>
                    <button id="none-${user.id}" class="float-right inline rounded px-4 py-2 bg-gray-600 text-white">Ninguno</button>
                </div> 
                    <hr class="my-2">
            `)
            $(`#admin-${user.id}`).on('click',{user: user.id}, () => {
                setPrivilege(user.id, 'admin')
            })
            $(`#user-${user.id}`).on('click',{user: user.id}, () => {
                setPrivilege(user.id, 'user')
            })
            $(`#none-${user.id}`).on('click',{user: user.id}, () => {
                setPrivilege(user.id, 'none')
            })
        });
    })

})

function setPrivilege(user, role) {
    if (role === 'admin' || role === 'user' || role === 'none') {
        db.doc(`users/${user}`).update({role})
            .catch(() => alert('Ocurrió un error'))
    }
}
