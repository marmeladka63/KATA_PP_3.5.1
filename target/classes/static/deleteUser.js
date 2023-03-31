
$(async function() {
    deleteUser();
});


function deleteUser() {
    const deleteForm = document.forms["modalForm"];
    deleteForm.addEventListener("submit", ev => {
        ev.preventDefault();
        fetch(`http://localhost:8088/api/admin/` + deleteForm.id.value, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                $('#deleteFormCloseButton').click();
                tableBuilder();
            })
    })
}

$('#delete').on('show.bs.modal', ev => {
    let button = $(ev.relatedTarget);
    let id = button.data('id');
    deleteUsers(id);
})



async function deleteUsers(id) {
    const user = await getUser(id);
    const form = document.forms["modalForm"];
    form.id.value = user.id;
    form.username.value = user.username;
    form.lastname.value = user.lastname;
    form.age.value = user.age;
    form.email.value = user.email;
    form.password.value = user.password;
}


async function getUser(id) {
    const url = `http://localhost:8088/api/admin/` + id;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}




