import { Controller } from './controller.js';
import { createTodoElement } from '../views/components/createIUTodoElement.js';
import { createIUProject } from '../views/components/createIUProject.js';

class localStorageController {

    constructor(logicController) {

        this.logicController = logicController;

    }

    //Se ejecuta cada vez que se carga la pagina 

    initialize() {

        console.log(localStorage);

        if (localStorage.length) {

            const projectKeys = Object.keys(localStorage);

            console.log(projectKeys);

            projectKeys.forEach(projectName => {

                let currentProjectString = localStorage.getItem(projectName);
                console.log(currentProjectString);
                
                let currentProjectObject = JSON.parse(currentProjectString);
                console.log(currentProjectObject);

                if (currentProjectObject.id === '1') {

                    let defaultProjectFromLocalStorage = currentProjectObject;
                    console.log(defaultProjectFromLocalStorage);

                    let defaultProjectFromController = this.logicController.getProject('1');
                    console.log(defaultProjectFromController);

                    defaultProjectFromLocalStorage = defaultProjectFromLocalStorage;

                    console.log(defaultProjectFromController === defaultProjectFromLocalStorage);

                    console.log(defaultProjectFromController);

                    //FALTA RENDERIZAR SI ESTO FUNCIONA

                    this.renderIU(defaultProjectFromLocalStorage);
                }

                else {

                    let newProject = this.logicController.createProject(projectName, currentProjectObject.id);

                    this.renderIU(newProject);

                }

            })

        }

        else {
            console.log('No hay proyectos guardados en local storage actualmente');
            this.saveProjectAtLocalStore('1');
        }

    }

    saveProjectAtLocalStore(projectId) {

        let project = this.logicController.getProject(projectId);

        console.log(project);

        let projectString = JSON.stringify(project);
        let projectName = project.name;

        localStorage.setItem(projectName, projectString);

    }

    saveTodoAtLocalStore(todo, projectId) {

        let projectFromController = this.logicController.getProject(projectId);
        console.log(projectFromController);

        const projectKeys = Object.keys(localStorage);

        console.log(projectKeys);

        console.log(todo);

        console.log(projectId); 

        projectKeys.forEach( projectName => {

            let currentProjectString = localStorage.getItem(projectName);
            console.log(currentProjectString);
            
            let currentProjectObject = JSON.parse(currentProjectString);
            console.log(currentProjectObject);

            if (currentProjectObject.id === projectId) {

                let todos = projectFromController.todosList;

                console.log(todos);

                let todosLength = todos.length;
 
                for (let i = 0; i < todosLength; i++) {
                    if (todos[i].id === todo.id) {
                        todos[i] = todo;
                        // Actualizar localStorage aquí
                        localStorage.setItem(projectName, JSON.stringify(currentProjectObject));
                        break; // Usar break en lugar de return
                    }
                }
            }
        })
    }

    renderIU(project) {

        console.log(project);

        let todosContainer;

        if (project.id === '1') {

            todosContainer = document.querySelector('[project-id="1"] .todosContainer');
            console.log(todosContainer);
        }

        else {

            const newProjectIU = createIUProject(project);
            document.querySelector('.gridContainer').appendChild(newProjectIU);

            todosContainer = newProjectIU.querySelector('.todosContainer');
            console.log(todosContainer);

        }
        
        const todosList = project.todosList;
        console.log(todosList);

        if (todosList.length) {

            for (const todo of todosList) {

                const newTodo = createTodoElement(todo, todo.id);
                todosContainer.appendChild(newTodo);

            }

        }
        

    }

}

export {localStorageController};