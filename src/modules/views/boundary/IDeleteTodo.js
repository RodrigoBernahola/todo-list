class IDeleteTodo {

    constructor(projectController) {

        this.projectController = projectController;

    }

    initialize() {

        this.attachEventListeners();

    }

    attachEventListeners() {

        document.addEventListener('click', (event) => {

            if (event.target.classList.contains('delete-todo')) {

                this.handleDeleteTodoClick(event);

            }

        });
    }   

    handleDeleteTodoClick(event) {

        //Se buscan y eliminan los objetos correspondientes a la interfaz clickeados. A través de sus ids.

        console.log(event);
        const todoItem = event.target.parentElement.parentElement;
        const todosContainer = todoItem.parentElement;

        const todoId = todoItem.getAttribute('todo-id');
        const projectId = todosContainer.parentElement.getAttribute('project-id');

        this.projectController.deleteTodo(todoId, projectId);

        //Una vez eliminados los objetos, se elimina su interfaz correspondiente

        todosContainer.removeChild(todoItem);

    }

}

export { IDeleteTodo };
