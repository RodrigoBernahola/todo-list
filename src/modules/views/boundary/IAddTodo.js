import { createDialog } from '../components/dialog.js';
import { validateDate }from '../../logic/validateDate.js';
import { createTodoElement } from '../components/createIUTodoElement.js';

class IAddTodo {
    constructor(projectController) {
        this.projectController = projectController;
        this.dialog = null;
        this.currentProjectId = null;
        this.currentProjectContainer = null;    
        
        // Bind methods to preserve 'this' context
        this.handleAddTodoClick = this.handleAddTodoClick.bind(this);
        this.handleAcceptClick = this.handleAcceptClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
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


    setupDialogEventListeners() {

        const acceptButton = this.dialog.querySelector('.acceptButton');
        const cancelButton = this.dialog.querySelector('.cancelButton');

        acceptButton.addEventListener('click', this.handleAcceptClick);
        cancelButton.addEventListener('click', this.handleCancelClick);
        
        // Event listener para cerrar con ESC
        this.dialog.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.handleCancelClick();
            }
        });

    }


    handleAcceptClick(event) {

        const todoData = this.extractData(event);
        
        if (todoData) {

            // Usar el controlador para agregar el todo
            let newTodo = this.projectController.addTodo(todoData, this.currentProjectId);

            let todoId = newTodo.id;

            // Actualizar la interfaz
            this.refreshUI(todoData, todoId, this.currentProjectContainer);

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
        //La descripcion y el checklist pueden estar vacios o por defecto

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

export { IAddTodo };