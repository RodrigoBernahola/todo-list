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

        const project = new Project(projectName, []);
        this.projects.push(project);

    }

    removeProject(projectName) {

        //Buscar el proyecto y eliminarlo del array de proyectos del controlador.

    }

    addTodo(todoData, projectName) {

        console.log(todoData);
        console.log(this.projects);
        console.log(projectName);

        //Con los datos del To-do crearlo y agregarlo al proyecto que corresponde, de crearlo se encarga el proyecto dueño.

        //Filtrar entre los proyectos existentes aquel que tiene el mismo nombre que el parametro y mandarle el mensaje con los datos del proyecto.

        this.projects.find( (project), project.name === projectName);

    }



}

export {Controller};

