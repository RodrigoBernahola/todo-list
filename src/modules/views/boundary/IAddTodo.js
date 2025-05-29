import { createDialog } from '../components/dialog.js';

class IAddTodo {
    constructor(projectController) {
        this.projectController = projectController;
        this.dialog = null;
        this.currentProject = null;
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

        document.addEventListener('click', (event) => {

            if (event.target.classList.contains('delete-todo')) {

                this.handleDeleteTodoClick(event);

            }

        });

        document.addEventListener('click', (event) => {

            if (event.targe.classList.contains('complete-todo')) {

                this.handleCompleteTodoClick(event);

            }

        })
    }


    handleCompleteTodoClick(event) {

        


    }



    handleDeleteTodoClick(event) {

        //En este metodo se debe obtener a que proyecto pertenece el todo seleccionado (su nombre) y el titulo del todo clickeado
        // console.log(event.target). Ademas de ello se debe eliminar la parte que corresponde a la interfaz.;


        //Se buscan y eliminan los objetos correspondientes a la interfaz clickeados.

        const todoTitle = event.target.parentElement.querySelector('.todo-title').textContent;
        const projectName = event.target.parentElement.parentElement.parentElement.querySelector('h3').textContent;
        this.projectController.deleteTodo(todoTitle, projectName);


        //Una vez eliminados los objetos, se elimina su interfaz correspondiente
        const todoItem = event.target.parentElement;
	    const todosContainer = todoItem.parentElement;
	    todosContainer.removeChild(todoItem);

    }



    handleAddTodoClick(event) {
        // Crear y mostrar el dialog
        this.dialog = createDialog();
        document.body.appendChild(this.dialog);
        
        // Guardar referencias del proyecto actual
        this.currentProject = event.target.parentElement.querySelector('h3').textContent;
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
            this.projectController.addTodo(todoData, this.currentProject);
            
            // Actualizar la interfaz
            this.refreshUI(todoData, this.currentProjectContainer);
            
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

        const title = formData.get('title');
        const description = formData.get('description') || '';
        const dueDate = formData.get('date');
        const priority = formData.get('priority');
        const isCompleted = formData.get('checklist') === 'on';

        // Validación
        if (!title || !dueDate || !priority) {
            return null;
        }

        return { title, description, dueDate, priority, isCompleted };
    }

    refreshUI(todoData, todosContainer) {
        const todoElement = this.createTodoElement(todoData);
        todosContainer.appendChild(todoElement);
    }

    createTodoElement(todoData) {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo-item';

        const elements = [
            { tag: 'h4', content: todoData.title, className: 'todo-title' },
            { tag: 'p', content: todoData.description, className: 'todo-description' },
            { tag: 'p', content: `Due: ${todoData.dueDate}`, className: 'todo-date' },
            { tag: 'p', content: `Priority: ${todoData.priority}`, className: 'todo-priority' },
            { tag: 'p', content: `Completed: ${todoData.isCompleted}`, className: 'todo-status' },
            { tag: 'button', content: 'Delete To-do', className: 'delete-todo' },
            { tag: 'button', content: 'Completed', className: 'complete-todo' },
            { tag: 'button', content: 'Edit To-do', className: 'edit-todo' }
        ];

        elements.forEach(({ tag, content, className }) => {
            const element = document.createElement(tag);
            element.textContent = content;
            element.className = className;
            todoDiv.appendChild(element);
        });

        return todoDiv;
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
        this.currentProject = null;
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
        // Aquí podrías remover event listeners globales si los hubiera
    }
}

export { IAddTodo };