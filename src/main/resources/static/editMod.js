async  function editUser(id) {

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
