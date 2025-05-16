import {Project} from '../logic/project.js';

class Controller {

    constructor(projects) {

        this.projects = projects;

    }

    createProject(projectName) {

        //Agregar comprobación luego, de que no haya un proyecto con el mismo nombre en el array de proyectos.

        const project = new Project(projectName, []);
        this.projects.push(project);

    }

    removeProject(projectName) {

        //Buscar el proyecto y eliminarlo del array de proyectos del controlador.

    }

    addTodo(e) {

        //Esto obtiene el HTML del proyecto que ha sido clickeado
        console.log(e.target.parentElement);

    }



}

export {Controller};

