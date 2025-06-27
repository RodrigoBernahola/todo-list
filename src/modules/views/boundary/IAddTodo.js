import { createDialog } from '../components/dialog.js';
import { isValid, parse } from "date-fns";


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

            if (event.target.classList.contains('complete-todo')) {

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

        console.log('TITULO');
        console.log(formData.get('title'));
        console.log(typeof(formData.get('title')));

        console.log('FECHA');
        console.log(formData.get('date'));
        console.log(typeof(formData.get('date')));

        console.log('PRIORIDAD');
        console.log(formData.get('priority'));
        console.log(typeof(formData.get('priority')));

        console.log('CHECKLIST');
        console.log(formData.get('checklist'));
        console.log(typeof(formData.get('chceklist')));        
        console.log(true === formData.get('checklist'));
        console.log(formData.get('checklist') === 'on'); //TRUE SI SE MARCA EL CHECKLIST

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


        // console.log(dueDate);
        // console.log(formData.get('date'));

        return { title, description, dueDate, priority, isCompleted };
    }


    validateDate(dateString) {

        if (!dateString || dateString.trim() === '') {
            console.log('Fecha requerida');
            return null;
        }
        // Para input HTML date, el formato yyyy-MM-dd es válido para Date()

        const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());

        if (!isValid(parsedDate)) {
            console.log('Error: La fecha ingresada no es válida o no está en el formato YYYY-MM-DD.');
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
        status.textContent = `Completed: ${todoData.isCompleted}`;
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