import {Project} from '../logic/project.js';
import {createIUProject} from '../views/components/createIUProject.js';

class Controller {

    constructor(projects) {

        this.projects = projects;

    }

    initialize(gridContainer) {

        //En este método se añadirá todo el funcionamiento necesario que se necesita la primera vez que carga la página

        this.createProject('Default Project');
        const iuNewProject = createIUProject(this.projects[0]);
        gridContainer.appendChild(iuNewProject);


    }

    createProject(projectName) {

        //Agregar comprobación luego, de que no haya un proyecto con el mismo nombre en el array de proyectos.

        const newProject = new Project(projectName, []);
        this.projects.push(newProject);

        let projectUUID = self.crypto.randomUUID();

        newProject.id = projectUUID;

        return newProject;

    }

    removeProject(projectName) {

        //Modificar método para que se elimine dado un id de proyecto

        //Buscar el proyecto y eliminarlo del array de proyectos del controlador.

    }

    addTodo(todoData, projectId) {

        //Con los datos del To-do crearlo y agregarlo al proyecto que corresponde, de crearlo se encarga el proyecto dueño.

        //Filtrar entre los proyectos existentes aquel que tiene el mismo id que el parametro y mandarle el mensaje con los datos del proyecto.

        let selectedProject = this.projects.find( (project) => project.id === projectId);

        let newTodo = selectedProject.addTodo(todoData);

        return newTodo;

    }

    deleteTodo(todoId, projectId) {

        let selectedProject = this.projects.find( (project) => project.id === projectId);

        selectedProject.deleteTodo(todoId);

    }

    completeTodo(todoId, projectId) {

        let selectedProject = this.projects.find( (project) => project.id === projectId);

        let checklistRes = selectedProject.completeTodo(todoId);
        
        return checklistRes;

    }

    editTodo(editTodoData, todoId, projectId) {

        let selectedProject = this.projects.find( (project) => project.id === projectId);
        
        let res = selectedProject.editTodo(editTodoData, todoId);

        return res;

    }



}

export {Controller};

