export function createProjectDialog() {

    const dialog = document.createElement('dialog');
    dialog.classList.add('dialogAddProject');

    const h2 = document.createElement('h2');
    h2.textContent = 'Create a new project';
    dialog.appendChild(h2);

    //Creo el formulario que estará dentro del dialog
    const form = document.createElement('form');
    form.setAttribute('method', 'dialog');
    dialog.appendChild(form);

    //Creo el campo nombre del proyecto a ingresar
    const labelName = document.createElement('label');
    labelName.textContent = 'Project Name:';
    labelName.setAttribute('for', 'projectName');
    form.appendChild(labelName);

    const inputName = document.createElement('input');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('id', 'projectName');
    inputName.setAttribute('name', 'projectName');
    inputName.required = true;
    form.appendChild(inputName);

    //Creacion de botones dentro del dialog
    const acceptButton = document.createElement('button');
    acceptButton.textContent = 'Accept';
    acceptButton.classList.add('acceptButton')
    form.appendChild(acceptButton);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add('cancelButton');
    form.appendChild(cancelButton);


    return dialog;

}