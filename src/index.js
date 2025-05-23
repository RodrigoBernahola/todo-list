//Imports section
import { createFooter } from './modules/views/components/footer.js';
import { createLandingPage } from './modules/views/components/landing.js';
import { Controller } from './modules/controllers/controller.js';
import { IAddTodo } from './modules/views/boundary/IAddTodo.js';
import { IAddProject } from './modules/views/boundary/IAddProject.js';

import './styles/styles.css';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicialización del DOM
    initializeDOM();
    
    // Inicialización de controladores
    const projectController = initializeControllers();
    
    // Inicialización de boundary objects (interfaces de usuario)
    initializeBoundaryObjects(projectController);

});


function initializeDOM() {

    const body = document.querySelector('body');
    
    // Agregar contenido de la landing page
    const landingPage = createLandingPage();
    body.appendChild(landingPage);
    
    // Agregar el contenido del footer
    const footer = createFooter();
    body.appendChild(footer);

}

function initializeControllers() {
    const gridContainer = document.querySelector('.gridContainer');
    
    // Crear el controlador del proyecto
    const projectController = new Controller([]);
    
    // Inicializar con proyecto por defecto
    projectController.initialize(gridContainer);
    
    return projectController;
}

function initializeBoundaryObjects(projectController) {
    // Inicializar el boundary para agregar todos
    const iAddTodo = new IAddTodo(projectController);
    iAddTodo.initialize();
    
    // Inicializar el boundary para agregar proyectos 
    const iAddProject = new IAddProject(projectController);
    iAddProject.initialize(); 

}

// Funciones de utilidad que podrían ser útiles
function handleGlobalErrors() {
    window.addEventListener('error', (event) => {
        console.error('Global error:', event.error);
        // Aquí podrías implementar logging o notificaciones de error
    });
}

// Opcional: llamar a handleGlobalErrors() si quieres manejo global de errores