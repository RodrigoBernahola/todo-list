import { createProjectDialog } from '../components/createProjectDialog.js';
import {createIUProject } from '../components/createIUProject.js';
import { localStorageController } from '../../controllers/localStorageController.js';

class IAddProject {

    constructor(projectController, localStorageController) {

        this.projectController = projectController;
        this.dialog = null; 
        this.localStorageController = localStorageController;


        // Bind methods to preserve 'this' context
        this.handleAddProjectClick = this.handleAddProjectClick.bind(this);
        this.handleAcceptClick = this.handleAcceptClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);

    }
    
    initialize() {

        this.attachEventListeners();

    }

    attachEventListeners() {

        document.addEventListener('click', (event) => {

            if (event.target.classList.contains('buttonAddNewProject')) {
                this.handleAddProjectClick(event);
            }

        })

    }

    handleAddProjectClick(event) {

        this.dialog = createProjectDialog();
        document.body.appendChild(this.dialog);

        this.setupDialogEventListeners();

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

    handleAcceptClick() {

        const projectName = this.dialog.querySelector('input').value;

        if (projectName) {

            //Se agrega el proyecto al array de proyectos
            const newProject = this.projectController.createProject(projectName);
            const newProjectIU = createIUProject(newProject);
            document.querySelector('.gridContainer').appendChild(newProjectIU);

            //Manejo de Local Storage
            this.localStorageController.saveProjectAtLocalStore(newProject.id);

        }

        else {
            alert('No se ingreso nombre de proyecto correctamente');
        }

        this.resetAndClose();

    }

    handleCancelClick() {
        this.resetAndClose();
    }

    resetAndClose() {
        if (this.dialog) {
            const form = this.dialog.querySelector('form');
            if (form) form.reset();
            
            this.dialog.close();
            this.dialog.remove();
            this.dialog = null;
        }
        
    }


}

export { IAddProject };