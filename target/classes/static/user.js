document.addEventListener('DOMContentLoaded', handleUserPageLoader);

async function getData() {
    const userId = document.querySelector('.user_id').value;
    const url = `/api/user/${userId}`;
    let response = await fetch(url);
    return response.json();
}

async function buildPage(user, table){


    let roles = [];
    for (let role of user.roles) {
        roles.push(' ' + role.role.toString().replaceAll('ROLE_', ''));
    }


    let tr= document.createElement('tr');

    tr.innerHTML =
        `<tr>
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.lastname}</td>
        <td>${user.age}</td>
        <td>${user.email}</td>
        <td>${roles}</td>
    </tr>`
    table.appendChild(tr);


}
async function handleUserPageLoader(event) {
    event.preventDefault();
    let table = document.getElementById('user-info');
    let user = await getData();
    await buildPage(user, table);
}
