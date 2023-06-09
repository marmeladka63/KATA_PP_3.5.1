
    const saveForm = document.getElementById("saveForm");
    saveForm.addEventListener("submit", handleFormSubmit);

    async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const url = '/api/admin/';

    const formData = new FormData(form);
    let object = {};
    formData.forEach((value, key) => {
    if (!Array.isArray(object[key])) {
    object[key] = [];
    object[key].push(value);
} else {
    object[key].push(value);
}

});

    let json = JSON.stringify(object);
    const fetchOptions = {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
},
    body: json,
};

    await fetch(url, fetchOptions);
    form.reset();
    await change_tab();
        $("#user-list-tab").click();

    await tableBuilder();
}
    function change_tab() {

        const newUserTab = document.getElementById('new-user-tab');
        const newUser = document.getElementById('new-user');
        newUserTab.setAttribute('class', 'nav-link');
        newUser.setAttribute('class', "tab-pane fade bg-white");

    }