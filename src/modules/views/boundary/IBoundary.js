import { IAddProject } from './IAddProject.js';
import { IAddTodo } from './IAddTodo.js';
import { IDeleteTodo } from './IDeleteTodo.js';
import { IEditTodo } from './IEditTodo.js';
import { ICompleteTodo } from './ICompleteTodo.js';

class IBoundary {

    constructor(projectController) {

        this.projectController = projectController;

    }

    initialize() {

        const iAddProject = new IAddProject(this.projectController);
        iAddProject.initialize();

        const iAddTodo = new IAddTodo(this.projectController);
        iAddTodo.initialize();

        const iDeleteTodo = new IDeleteTodo(this.projectController);
        iDeleteTodo.initialize();

        const iEditTodo = new IEditTodo(this.projectController);
        iEditTodo.initialize(); 

        const iCompleteTodo = new ICompleteTodo(this.projectController);
        iCompleteTodo.initialize();

    }

}

export { IBoundary };