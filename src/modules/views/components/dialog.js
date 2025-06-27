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
    dateLabel.textContent = 'Due date:';
    dateLabel.setAttribute('for', 'date');
    form.appendChild(dateLabel);

    const inputDate = document.createElement('input');
    inputDate.setAttribute('type', 'date');
    inputDate.setAttribute('id', 'date');
    inputDate.setAttribute('name', 'date');
    inputDate.required = true;
    form.appendChild(inputDate); 


    //Crear el elemento select con sus campos para prioridad

    const labelPriority = document.createElement('label');
    labelPriority.textContent = 'Select the priority:';
    labelPriority.setAttribute('for', 'priority');
    form.appendChild(labelPriority);

    const selectPriority = document.createElement('select');
    selectPriority.setAttribute('id', 'priority');
    selectPriority.setAttribute('name', 'priority');
    selectPriority.required = true;

    const optionSelect = document.createElement('option');
    optionSelect.textContent = 'Select an option';
    optionSelect.value = '';
    selectPriority.appendChild(optionSelect);

    const optionHigh = document.createElement('option');
    optionHigh.textContent = 'High priority';
    optionHigh.setAttribute('value', 'high');
    selectPriority.appendChild(optionHigh);

    const optionMedium = document.createElement('option');
    optionMedium.textContent = 'Medium priority';
    optionMedium.setAttribute('value', 'medium');
    selectPriority.appendChild(optionMedium);

    const optionLow = document.createElement('option');
    optionLow.textContent = 'Low priority';
    optionLow.setAttribute('value', 'low');
    selectPriority.appendChild(optionLow);

    form.appendChild(selectPriority);

    //Crear el campo para el checklist
    
    const checklistCheckbox = document.createElement('input');
    checklistCheckbox.setAttribute('type', 'checkbox');
    checklistCheckbox.setAttribute('id', 'checklist');
    checklistCheckbox.setAttribute('name', 'checklist');
    
    const checklistLabel = document.createElement('label');
    checklistLabel.setAttribute('for', 'checklist');
    checklistLabel.textContent = 'Mark as completed';
    
    form.appendChild(checklistCheckbox);
    form.appendChild(checklistLabel);


    //Creacion de botones dentro del dialog
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