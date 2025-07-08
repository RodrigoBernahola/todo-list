class ICompleteTodo {

    constructor (projectController) {

        this.projectController = projectController;

    }

    initialize() {

        this.attachEventListeners();

    }

    attachEventListeners() {

        document.addEventListener('click', (event) => {
        
            if (event.target.classList.contains('complete-todo')) {

                this.handleCompleteTodoClick(event);

            }

        });
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

}

export { ICompleteTodo };

