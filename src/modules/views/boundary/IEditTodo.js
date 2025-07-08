import { createEditDialog } from '../components/createEditDialog.js';
import { validateDate } from '../../logic/validateDate.js';
import { createTodoElement } from '../components/createIUTodoElement.js';


class IEditTodo {

    constructor(projectController) {

        this.projectController = projectController;
        this.dialog = null;
        this.currentTodoItem = null;
        this.currentTodoItemId = null;
        this.currentProjectId = null;
        this.currentProjectContainer = null;

        // Bind methods to preserve 'this' context
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);

    }

    initialize() {

        this.attachEventListeners();
        
    }

    attachEventListeners() {
    
        document.addEventListener('click', (event) => {

            if (event.target.classList.contains('edit-todo')) {

                this.handleEditTodoClick(event);

            }

        });

    }


    handleEditTodoClick(event) {

        const todoItem = event.target.parentElement.parentElement;
	    const todosContainer = todoItem.parentElement;

        const todoId = todoItem.getAttribute('todo-id');
        const projectId = todosContainer.parentElement.getAttribute('project-id');
        
        this.currentTodoItem = todoItem;
        this.currentTodoItemId = todoId;
        this.currentProjectId = projectId;
        this.currentProjectContainer = todosContainer;

        this.dialog = createEditDialog();
        document.body.appendChild(this.dialog);

        // Configurar event listeners específicos del dialog
        this.setupDialogEventListeners();
        
        // Mostrar el modal
        this.dialog.showModal();

    }


    setupDialogEventListeners() {

        const acceptButton = this.dialog.querySelector('.acceptButton');
        const cancelButton = this.dialog.querySelector('.cancelButton');

        acceptButton.addEventListener('click', this.handleEditClick);
        cancelButton.addEventListener('click', this.handleCancelClick);
        
        // Event listener para cerrar con ESC
        this.dialog.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.handleCancelClick();
            }
        });

    }


    extractEditData(event) {

        event.preventDefault();

        const form = this.dialog.querySelector('form');
        const formData = new FormData(form);

        const title = formData.get('title');
        const description = formData.get('description') || '';

        let dueDateString = formData.get('date');

        const priority = formData.get('priority');

        //Validaciones de los datos a editar ingresados

        const dueDate = validateDate(dueDateString);

        if (!title || !priority || !dueDate) {
            return null;
        };

        return { title, description, dueDate, priority };

    }


    handleEditClick(event) {

        const editTodoData = this.extractEditData(event);

        //Sera verdadero si editTodoData no ha sido retornado como null en la llamada anterior, por lo tanto hay datos cargados válidos
        if (editTodoData) {

            //Delegar al controlador la actualización de los datos nuevos del todo clickeado
            
            let edittedTodo = this.projectController.editTodo(editTodoData, this.currentTodoItemId, this.currentProjectId);

            this.currentTodoItem.remove();

            this.refreshUI(edittedTodo, edittedTodo.id, this.currentProjectContainer);


            //Limpiar form y cerrarlo
            this.resetAndClose();
        }

        else {
            this.showError('Pleas fill in all required fields');
        }

    }


    refreshUI(todoData, todoId, todosContainer) {
    
        const todoElement = createTodoElement(todoData, todoId);
        todosContainer.appendChild(todoElement);

    }


    handleCancelClick() {
        this.resetAndClose();
    }


    resetAndClose() {

        if (this.dialog) {
            const form = this.dialog.querySelector('form');
            if (form) form.reset();
            
            this.dialog.close();
            this.dialog.remove();
            this.dialog = null;
        }
        
        // Limpiar referencias
        this.currentTodoItem = null;
        this.currentTodoItemId = null;
        this.currentProjectId = null;
        this.currentProjectContainer = null;
        this.currentProjectId = null;

    }


    showError(message) {

        // Podrías implementar un sistema de notificaciones más sofisticado
        alert(message);

    }


    // Método para limpiar event listeners si es necesario
    destroy() {

        if (this.dialog) {
            this.dialog.remove();
        }

    }

}



export { IEditTodo };