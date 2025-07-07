import { createDialog } from '../components/dialog.js';
import { isValid, parse } from 'date-fns';
import { createEditDialog} from '../components/createEditDialog.js';
import { validateDate }from '../../logic/validateDate.js';
import { formatDate } from '../../logic/formatDate.js';
import { createTodoElement } from '../components/createIUTodoElement.js';
import { createTodoElement } from '../components/createIUTodoElement.js';
import { localStorageController } from '../../controllers/localStorageController.js';


class IAddTodo {
    constructor(projectController, localStorageController) {
        this.projectController = projectController;
        this.dialog = null;
        this.currentProjectId = null;
        this.currentProjectContainer = null;    
        this.currentTodoItemId = null;
        this.currentTodoItem = null;
        this.localStorageController = localStorageController;
        
        // Bind methods to preserve 'this' context
        this.handleAddTodoClick = this.handleAddTodoClick.bind(this);
        this.handleAcceptClick = this.handleAcceptClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    // Método para inicializar los event listeners
    initialize() {
        this.attachEventListeners();
    }

    // Método central para manejar todos los eventos relacionados
    attachEventListeners() {
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('add-todo')) {
                this.handleAddTodoClick(event);
            }
        });

        document.addEventListener('click', (event) => {

            if (event.target.classList.contains('delete-todo')) {

                this.handleDeleteTodoClick(event);

            }

        });

        document.addEventListener('click', (event) => {

            if (event.target.classList.contains('complete-todo')) {

                this.handleCompleteTodoClick(event);

            }

        });

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
        this.currentProjectId = todosContainer.parentElement;

        this.dialog = createEditDialog();
        document.body.appendChild(this.dialog);

        // Configurar event listeners específicos del dialog
        this.setupDialogEventListeners(true);
        
        // Mostrar el modal
        this.dialog.showModal();

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

        return {title, description, dueDate, priority};

    }

    setupDialogEventListeners(flag = false) {

        const acceptButton = this.dialog.querySelector('.acceptButton');
        const cancelButton = this.dialog.querySelector('.cancelButton');

        if (flag) {
            acceptButton.addEventListener('click', this.handleEditClick);
        }

        else {
            acceptButton.addEventListener('click', this.handleAcceptClick);
        }
        
        cancelButton.addEventListener('click', this.handleCancelClick);
        
        // Event listener para cerrar con ESC
        this.dialog.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.handleCancelClick();
            }
        });

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


    handleCompleteTodoClick(event) {

        let string;

        //Se buscan y eliminan los objetos correspondientes a la interfaz clickeados. A través de sus ids.

        const todoItem = event.target.parentElement.parentElement;
	    const todosContainer = todoItem.parentElement;

        const todoId = todoItem.getAttribute('todo-id');
        const projectId = todosContainer.parentElement.getAttribute('project-id');

        let checklistRes = this.projectController.completeTodo(todoId, projectId);

        //AGREGAR LA ACTUALIZACION DE INTERFAZ DE ESTE TODO

        checklistRes ? string = 'Completed: Yes' : string = 'Completed: No';

        todoItem.querySelector('p.todo-status').textContent = string;


    }


    handleDeleteTodoClick(event) {

        //Se buscan y eliminan los objetos correspondientes a la interfaz clickeados. A través de sus ids.

        const todoItem = event.target.parentElement.parentElement;
	    const todosContainer = todoItem.parentElement;

        const todoId = todoItem.getAttribute('todo-id');
        const projectId = todosContainer.parentElement.getAttribute('project-id');

        this.projectController.deleteTodo(todoId, projectId);

        //Una vez eliminados los objetos, se elimina su interfaz correspondiente
    
	    todosContainer.removeChild(todoItem);

        //Eliminar los datos del almacenamiento local
        
        //this.localStorageController.storeProject(projectId);
        //this.localStorageController.deleteTodoFromLocalStorage(todoId, projectId);

    }


    handleAddTodoClick(event) {
        // Crear y mostrar el dialog
        this.dialog = createDialog();
        document.body.appendChild(this.dialog);

        // Guardar referencias del proyecto actual

        this.currentProjectId = event.target.parentElement.getAttribute('project-id');
        this.currentProjectContainer = event.target.parentElement.querySelector('.todosContainer');
        
        // Configurar event listeners específicos del dialog
        this.setupDialogEventListeners();
        
        // Mostrar el modal
        this.dialog.showModal();
    }

    handleAcceptClick(event) {
        const todoData = this.extractData(event);
        
        if (todoData) {
            // Usar el controlador para agregar el todo
            console.log(todoData);
            console.log(this.projectController);
            let newTodo = this.projectController.addTodo(todoData, this.currentProjectId);

            let todoId = newTodo.id;
            console.log(newTodo);
            console.log(this.currentProjectId);

            // Actualizar la interfaz
            this.refreshUI(todoData, todoId, this.currentProjectContainer);
            
            //Actualizar local storage
            this.localStorageController.saveTodoAtLocalStore(newTodo, this.currentProjectId);

            // Limpiar y cerrar
            this.resetAndClose();
        } else {
            this.showError('Please fill in all required fields');
        }
    }

    handleCancelClick() {
        this.resetAndClose();
    }


    extractData(event) {

        event.preventDefault();

        const form = this.dialog.querySelector('form');
        const formData = new FormData(form);

        const title = formData.get('title'); //string
        const description = formData.get('description') || ''; //string

        let dueDateString = formData.get('date'); //string
        
        const priority = formData.get('priority'); //Duvuelve un string con el texto seleccionado
        const isCompleted = formData.get('checklist'); //Devuelve object o null

        //Los datos que son necesarios validar (obligatorios) son: Titulo, prioridad, fecha. 
        // La descripcion y el checklist pueden estar vacios o por defecto

        // Validaciones

        if (!title || !priority) {
            return null;
        };

        // Validar fecha y obtener el objeto Date
        const dueDate = validateDate(dueDateString);
        if (!dueDate) {
            return null;
        }

        return { title, description, dueDate, priority, isCompleted };
    }


    refreshUI(todoData, todoId, todosContainer) {
        const todoElement = createTodoElement(todoData, todoId);
        todosContainer.appendChild(todoElement);
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
        this.currentProjectId = null;
        this.currentProjectContainer = null;
        this.currentTodoItem = null;
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
        // Aquí podrías remover event listeners globales si los hubiera
    }

}

export { IAddTodo };