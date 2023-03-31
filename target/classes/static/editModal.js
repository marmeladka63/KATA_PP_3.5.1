$(async function() {
    editUser();
});

function editUser() {
    const editForm = document.forms["formEditUser"];
    editForm.addEventListener("submit", ev => {
        ev.preventDefault();

        const selected_options = document.querySelector('#sel_roles1').selectedOptions;

        const rolesNamesArray = new Array(selected_options.length);
        for (let i = 0; i < selected_options.length; i++) {
            rolesNamesArray[i] = selected_options[i].value;
        }

        fetch(`http://localhost:8088/api/admin/` + editForm.id.value, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: editForm.id.value,
                firstName: editForm.username.value,
                lastName: editForm.lastname.value,
                age: editForm.age.value,
                email: editForm.email.value,
                password: editForm.password.value,
                roles: rolesNamesArray
            })
        }).then(() => {
            $('#editFormCloseButton').click();
            tableBuilder();
        })
    })
}

$('#edit').on('show.bs.modal', ev => {
    const button = $(ev.relatedTarget);
    const id = button.data('id');
    editUsers(id);
})

async function editUsers(id) {
    const user = await getUser(id);
    const form = document.forms["formEditUser"];
    form.id.value = user.id;
    form.username.value = user.username;
    form.lastname.value = user.lastname;
    form.age.value = user.age;
    form.email.value = user.email;
    form.password.value = user.password;
}