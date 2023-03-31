document.addEventListener('DOMContentLoaded', tableBuilder);

async function getData() {
    const url = '/api/admin';
    let response = await fetch(url);
    return response.json();
}

async function tableBuilder() {
    const tBody = document.getElementById("tbody_users");
    let listAllUsers = await getData();
    let tr = '';
    for (let user of listAllUsers) {
        let roles = [];
        for (let role of user.roles) {
            roles.push(' ' + role.role.toString().replaceAll('ROLE_', ''));
        }
        tr +=
            `<tr>
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.lastname}</td>
        <td>${user.age}</td>
        <td>${user.email}</td>
        <td>${roles}</td>
        <td>
            <td>
            <button type="button" class="btn btn-info" data-toggle="modal" id="buttonEdit"
            data-action="edit" data-id="${user.id}" data-target="#edit">Edit</button>
            </td>
        </td>
        <td>
        <button type="button" class="btn btn-danger" data-toggle="modal" id="buttonDelete"
         data-action="delete" data-id="${user.id}" data-target="#delete">Delete</button>
         </td>
    </tr>`
    }

    tBody.innerHTML = tr;
}



