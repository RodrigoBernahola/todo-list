import { createDialog } from '../components/dialog.js';
import { isValid, parse } from 'date-fns';
import { createEditDialog} from '../components/createEditDialog.js';


class IAddTodo {
    constructor(projectController) {
        this.projectController = projectController;
        this.dialog = null;
        this.currentProject = null;
        this.currentProjectContainer = null;    
        this.currentTodoItemId = null;
        this.currentProjectId = null;
        this.currentTodoItem = null;
        
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
        this.currentProject = todosContainer.parentElement;

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

        const dueDate = this.validateDate(dueDateString);

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

    }


    handleAddTodoClick(event) {
        // Crear y mostrar el dialog
        this.dialog = createDialog();
        document.body.appendChild(this.dialog);

        // Guardar referencias del proyecto actual
        this.currentProject = event.target.parentElement.getAttribute('project-id');
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
            let newTodo = this.projectController.addTodo(todoData, this.currentProject);

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
        // La descripcion y el checklist pueden estar vacios o por defecto

        // Validaciones

        if (!title || !priority) {
            return null;
        };

        // Validar fecha y obtener el objeto Date
        const dueDate = this.validateDate(dueDateString);
        if (!dueDate) {
            return null;
        }

        return { title, description, dueDate, priority, isCompleted };
    }


    validateDate(dateString) {

        if (!dateString || dateString.trim() === '') {
            return null;
        }
        // Para input HTML date, el formato yyyy-MM-dd es válido para Date()

        const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());

        if (!isValid(parsedDate)) {
            return null; // Si no es válida, devolvemos null
        }

        return parsedDate; // Devuelve el objeto Date válido

    }

    refreshUI(todoData, todoId, todosContainer) {
        const todoElement = this.createTodoElement(todoData, todoId);
        todosContainer.appendChild(todoElement);
    }


    createTodoElement(todoData, todoId) {
        // Crear el contenedor principal
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo-item new';
        todoDiv.setAttribute('todo-id', todoId);
        
        // Si está completado, añadir la clase correspondiente
        if (todoData.isCompleted === 'on') {
            todoDiv.classList.add('completed');
        }
        
        // Crear los elementos de información
        const title = document.createElement('h4');
        title.textContent = todoData.title;
        title.className = 'todo-title';
        
        const description = document.createElement('p');
        description.textContent = todoData.description;
        description.className = 'todo-description';
        
        const dueDate = document.createElement('p');
        dueDate.textContent = `Due: ${this.formatDate(todoData.dueDate)}`;
        dueDate.className = 'todo-date';
        
        const priority = document.createElement('p');
        priority.textContent = `Priority: ${todoData.priority}`;
        priority.className = 'todo-priority';
        priority.dataset.priority = todoData.priority.toLowerCase();
        
        const status = document.createElement('p');

        let statusText = todoData.isCompleted !== null ? 'Yes' : 'No'; 
        status.textContent = `Completed: ${statusText}`;
        status.className = 'todo-status';
        status.dataset.completed = todoData.isCompleted;

        
        // Crear contenedor para los botones
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'todo-actions';
        
        // Crear botones
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete To-do';
        deleteBtn.className = 'delete-todo';
        
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Completed';
        completeBtn.className = 'complete-todo';
        
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit To-do';
        editBtn.className = 'edit-todo';
        
        // Añadir botones al contenedor de acciones
        actionsDiv.appendChild(deleteBtn);
        actionsDiv.appendChild(completeBtn);
        actionsDiv.appendChild(editBtn);
        
        // Añadir todos los elementos al contenedor principal
        todoDiv.appendChild(title);
        todoDiv.appendChild(description);
        todoDiv.appendChild(dueDate);
        todoDiv.appendChild(priority);
        todoDiv.appendChild(status);
        todoDiv.appendChild(actionsDiv);
        
        // Eliminar la clase 'new' después de la animación
        setTimeout(() => {
            todoDiv.classList.remove('new');
        }, 500);
    
    return todoDiv;
    }   


    // Método auxiliar para formatear fechas
    formatDate(dateString) {
        if (!dateString) return 'No date';
        
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return dateString;
            
            return date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
        } catch (e) {
            return dateString;
        }
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