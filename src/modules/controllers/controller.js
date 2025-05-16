import {Project} from '../logic/project.js';
import {createIUProject} from '../views/components/createIUProject.js';

class Controller {

    constructor(projects) {

        this.projects = projects;

    }

    initialize(gridContainer) {

        //En este método se añadirá todo el funcionamiento necesario que se necesita la primera vez que carga la página

        const firstProject = this.createProject('Default Project');
        const iuNewProject = createIUProject(this.projects[0]);
        gridContainer.appendChild(iuNewProject);


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

