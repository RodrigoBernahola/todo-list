//Imports section
import { Todo } from './modules/logic/todo.js';
import { createFooter } from './modules/views/components/footer.js';
import { createLandingPage } from './modules/views/components/landing.js';
import { Controller } from './modules/controllers/controller.js';
import { createIUProject } from './modules/views/components/createIUProject.js';
import { createDialog } from './modules/views/components/dialog.js';

import './styles/styles.css';


if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}


document.addEventListener('DOMContentLoaded', () => {

    //Selección del elemento body (referencia)
    const body = document.querySelector('body');

    //Agregar contenido de la landing page
    const landingPage = createLandingPage();
    body.appendChild(landingPage);

    //Agregar la etiqueta dialogs al body
    const dialog = createDialog();
    body.appendChild(dialog);

    //Agregar el contenido del footer
    const footer = createFooter();
    body.appendChild(footer)

    //Selección del elemento contenedor de proyectos
    const gridContainer = document.querySelector('.gridContainer');


    //CU (Añadir To-Do a un proyecto específico)
    //<-------------------------------------------------------------->


    //Se crea el objeto que es controlador del caso de uso (Gestor)

    const projectController =  new Controller([]);

    projectController.createProject('Default Project example');

    console.log(projectController);

    //En esta sección se hardcodea un nuevo Todo (estos datos deberán ser tomados desde la interfaz, luego validados y si son correctos crear y agregar un nuevo To-Do al proyecto que se haya seleccionado en la interfaz).

    // const myTodo = new Todo('Task 1', 'Description', '2025-05-12', 'High', 'Some notes', false);

    // projectController.projects[0].addTodo(myTodo);

    // console.log(projectController);

    //El primer proyecto "default" debe ser hardcodeado porque se carga al entrar a la página. Crear esa lógica.


    //Creo la interfaz de un nuevo proyecto, extrayendo los datos del primer elemento del array del controllador, que contiene a los proyectos, la función devuelve la iu necesaria y la agrego al contenedor de proyectos luego.

    console.log(projectController.projects[0]);
    console.log(gridContainer)

    const iuNewProject = createIUProject(projectController.projects[0]);
    gridContainer.appendChild(iuNewProject);
    

    //Manejar los eventos

    const botonAgregarTodo = document.querySelector('.add-todo');

    botonAgregarTodo.addEventListener('click', (e) => {projectController.addTodo(e)});

});