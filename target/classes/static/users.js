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
            <button class="btn btn-primary " style="color:white" data-bs-toggle="modal"
            data-bs-target="#modalFrame" id="edit"
           >Edit</button>
        </td>
        <td>
            <button class="btn btn-danger" style="color:white" data-bs-toggle="modal"
            data-bs-target="#modalFrame" 
            onclick= "deleteUser(${user.id})">Delete</button>
        </td>
    </tr>`
    }

    tBody.innerHTML = tr;
}


/*
const modalForm = document.getElementById('modalForm');


async function getUser(id) {
    const url = '/api/admin/' + id;
    let response = await fetch(url);
       return response.json();  //возвращает промис юзера с id


}


async function editUser(id) {

    let data = await getUser(id); // получение json

    const { elements } = modalForm; // запись формф в объект

    const editTitle = document.getElementById('modal-title'); // меняем название заголовка окна
    editTitle.innerHTML = 'Edit user';
    const editButton = document.getElementById('modal-submit'); // меняем название кнопки
    editButton.innerHTML = 'Edit';

    modalForm.setAttribute('action', '/api/admin/edit'); // ссылка на url реста
    modalForm.addEventListener("submit", patchData);// при нажатии на кнопку переходим к методу patchData

    for (const [ key, value ] of Object.entries(data) ) {
        const field = elements.namedItem(key);
        if (key !== 'id' && field !== null) {
            field.removeAttribute('disabled');
        }
        if (key !== 'password') {
            field && (field.value = value);
        }
        if (key === 'roles') {
            let options = Array.from(field);
            for (let role of value) {
                for (let option of options) {
                    if (option.value === role.role) {
                        option.selected = true;
                    }
                }
            }
        }
    }
}


async function patchData(event) { // функция события
    event.preventDefault();

    const form = event.currentTarget; //назначено событие на form
    const url = form.action; // событие
    const formData = new FormData(form);
    let object = {};
    formData.forEach((value, key) => {
        if(key=='role'){

        }
        if (key !== 'roles') {
            object[key] = value;
        } else {
            if (!Array.isArray(object[key])) {
                object[key] = [];
                object[key].push(value);
            } else {
                object[key].push(value);
            }
        }
    });

    let json = JSON.stringify(object);
    console.log(json)
    const fetchOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: json,
    };

    await fetch(url, fetchOptions);
    form.reset();
    $('#close').click();
    await tableBuilder();
}

/!*DELETE*!/
async function deleteUser(id) {

    let data = await getUser(id);
    const { elements } = modalForm;

    const deleteTitle = document.getElementById('modal-title');
    deleteTitle.innerHTML = 'Delete user';
    const deleteButton = document.getElementById('modal-submit');
    deleteButton.innerHTML = 'Delete';


    modalForm.setAttribute('action', '/api/admin/' + id);
    modalForm.addEventListener("submit", deleteData);

    let fields = modalForm.elements;
    for (let field of fields) {
        if (field !== document.getElementById('modal-submit')) {
            field.setAttribute('disabled', 'disabled');
        }
    }


    for (const [ key, value ] of Object.entries(data) ) {
        const field = elements.namedItem(key);
        if (key !== 'password') {
            field && (field.value = value);
        }
        if (key === 'roles') {
            let options = Array.from(field);
            for (let role of value) {
                for (let option of options) {
                    if (option.value === role.role) {
                        option.selected = true;
                    }
                }
            }
        }
    }
}

async function deleteData(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const url = form.action;


    const fetchOptions = {
        method: "DELETE",
    };

    await fetch(url, fetchOptions);

    form.reset();
    $('#close').click();
    await tableBuilder();
}





*/


