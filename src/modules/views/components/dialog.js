//Función encargada de crear y agregar el dialog para obtener los datos del usuario

export function createDialog() {

    //Creo el elemento <dialog>
    const dialog = document.createElement('dialog');

    //Creo el título del dialogo <h2>
    const h2 = document.createElement('h2');
    h2.textContent = 'Add a new To-Do to this project';
    dialog.appendChild(h2);
    dialog.classList.add('dialogAddTodo');

    //Creo el formulario que estará dentro del dialog
    const form = document.createElement('form');
    form.setAttribute('method', 'dialog');
    dialog.appendChild(form);

    //Creo el campo título del To-do a ingresar
    const labelTitle = document.createElement('label');
    labelTitle.textContent = 'To-do Title:';
    labelTitle.setAttribute('for', 'title');
    form.appendChild(labelTitle);

    const inputTitle = document.createElement('input');
    inputTitle.setAttribute('type', 'text');
    inputTitle.setAttribute('id', 'title');
    inputTitle.setAttribute('name', 'title');
    inputTitle.required = true;
    form.appendChild(inputTitle);


    //Creo el campo descripción del To-do a ingresar
    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Add a description:';
    descriptionLabel.setAttribute('for', 'description');
    form.appendChild(descriptionLabel);

    const descriptionTextArea = document.createElement('textarea');
    descriptionTextArea.setAttribute('id', 'description');
    descriptionTextArea.setAttribute('maxlength', '100');
    descriptionTextArea.setAttribute('name', 'description');
    descriptionTextArea.setAttribute('rows', '3');
    form.appendChild(descriptionTextArea);

    //Crear el campo fecha, luego modificarlo 
    const dateLabel = document.createElement('label');
    dateLabel.textContent = 'Ingresa la fecha de vencimiento:';
    dateLabel.setAttribute('for', 'date');



    const acceptButton = document.createElement('button');
    acceptButton.textContent = 'Accept';
    acceptButton.classList.add('acceptButton')
    form.appendChild(acceptButton);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add('cancelButton');
    form.appendChild(cancelButton);







    return dialog

}