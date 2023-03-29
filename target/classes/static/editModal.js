const editForm = document.getElementById('editForm');
const edit_id = document.getElementById('edit_id');
const edit_name = document.getElementById('edit_name');
const edit_lastName = document.getElementById('edit_lastName');
const edit_age = document.getElementById('edit_age');
const edit_email = document.getElementById('edit_email');
const edit_password = document.getElementById('edit_password');

async function editModal(id) {
    const urlDataEdit = '/api/admin/' + id;
    let modalEdit = await fetch(urlDataEdit);
    if (modalEdit.ok) {
        let userData =
            await modalEdit.json().then(async user => {
                edit_id.value = `${user.id}`;
                edit_name.value = `${user.username}`;
                edit_lastName.value = `${user.lastname}`;
                edit_age.value = `${user.age}`;
                edit_email.value = `${user.email}`;
            })
    } else {
        alert(`Error, ${modalEdit.status}`)
    }
}

async function editUser() {
    let urlEdit = '/api/admin/' + edit_id.value;
    let roles = [];
    for (let i = 0; i < editForm.roles.options.length; i++) {
        if (editForm.roles.options[i].selected) {
            roles.push("ROLE_" + editForm.roles.options[i].value);
        }
    }
    let method = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: editForm.username.value,
            lastName: editForm.lastname.value,
            age: editForm.age.value,
            email: editForm.email.value,
            password: editForm.password.value,
            roles: roles
        })
    }

    await fetch(urlEdit, method).then(() => {
        $('#editFrom_closeButton').click();
        tableBuilder();
    })
}

