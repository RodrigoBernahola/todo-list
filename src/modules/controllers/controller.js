import { Project } from '../logic/project.js';
import { Todo } from '../logic/todo.js';
import { StorageManager } from '../logic/storageManager.js';
import { createIUProject } from '../views/components/createIUProject.js';
import { createTodoElement } from '../views/components/createIUTodoElement.js';

class Controller {

    constructor(projects) {
        this.projects = projects;
        // Crear instancia del gestor de almacenamiento
        this.storageManager = new StorageManager();
    }

    initialize(gridContainer) {
        // Primero intentar cargar proyectos existentes desde Local Storage
        this.loadProjectsFromStorage(gridContainer);
        
        // Si no hay proyectos guardados, crear el proyecto por defecto
        if (this.projects.length === 0) {
            let defaultProject = this.createProject('Default Project');
            const iuNewProject = createIUProject(defaultProject);
            gridContainer.appendChild(iuNewProject);
        }
    }


    loadProjectsFromStorage(gridContainer) {
        try {
            // Obtener datos planos desde Local Storage
            const storedProjectsData = this.storageManager.loadProjects();
            
            // Reconstruir cada proyecto y sus todos
            storedProjectsData.forEach(projectData => {
                // Crear instancia de Project
                const project = new Project(projectData.name, []);
                project.id = projectData.id;
                
                // Reconstruir todos los todos del proyecto
                if (projectData.todosList && projectData.todosList.length > 0) {
                    projectData.todosList.forEach(todoData => {
                        // Crear instancia de Todo
                        const todo = new Todo(
                            todoData.title,
                            todoData.description,
                            todoData.dueDate,
                            todoData.priority,
                            todoData.checklist
                        );
                        todo.id = todoData.id;
                        
                        // Agregar el todo al proyecto
                        project.todosList.push(todo);
                    });
                }
                
                // Agregar el proyecto reconstruido al array
                this.projects.push(project);
                
                // Crear y mostrar la interfaz del proyecto
                const iuProject = createIUProject(project);
                gridContainer.appendChild(iuProject);
                
                // Mostrar todos los todos en la interfaz
                const todosContainer = iuProject.querySelector('.todosContainer');
                project.todosList.forEach(todo => {
                    const todoElement = createTodoElement(todo, todo.id);
                    todosContainer.appendChild(todoElement);
                });
            });
            
            console.log(`Cargados ${storedProjectsData.length} proyectos desde Local Storage`);
            
        } catch (error) {
            console.error('Error al cargar proyectos desde Local Storage:', error);
        }
    }

 
    saveProjectsToStorage() {
        try {
            this.storageManager.saveProjects(this.projects);
        } catch (error) {
            console.error('Error al guardar proyectos:', error);
        }
    }

    createProject(projectName) {
        // Agregar comprobación de que no haya un proyecto con el mismo nombre
        const existingProject = this.projects.find(project => project.name === projectName);
        if (existingProject) {
            console.warn(`Ya existe un proyecto con el nombre: ${projectName}`);
            return null;
        }

        const newProject = new Project(projectName, []);
        let projectUUID = self.crypto.randomUUID();
        newProject.id = projectUUID;
        
        this.projects.push(newProject);
        
        // Guardar en Local Storage después de crear el proyecto
        this.saveProjectsToStorage();
        
        return newProject;
    }


    addTodo(todoData, projectId) {
        let selectedProject = this.projects.find(project => project.id === projectId);
        
        if (!selectedProject) {
            console.error(`No se encontró el proyecto con ID: ${projectId}`);
            return null;
        }

        let newTodo = selectedProject.addTodo(todoData);
        
        // Guardar cambios en Local Storage
        this.saveProjectsToStorage();
        
        return newTodo;
    }

    deleteTodo(todoId, projectId) {
        let selectedProject = this.projects.find(project => project.id === projectId);
        
        if (!selectedProject) {
            console.error(`No se encontró el proyecto con ID: ${projectId}`);
            return;
        }

        selectedProject.deleteTodo(todoId);
        
        // Guardar cambios en Local Storage
        this.saveProjectsToStorage();
    }

    completeTodo(todoId, projectId) {
        let selectedProject = this.projects.find(project => project.id === projectId);
        
        if (!selectedProject) {
            console.error(`No se encontró el proyecto con ID: ${projectId}`);
            return null;
        }

        let checklistRes = selectedProject.completeTodo(todoId);
        
        // Guardar cambios en Local Storage
        this.saveProjectsToStorage();
        
        return checklistRes;
    }

    editTodo(editTodoData, todoId, projectId) {
        let selectedProject = this.projects.find(project => project.id === projectId);
        
        if (!selectedProject) {
            console.error(`No se encontró el proyecto con ID: ${projectId}`);
            return null;
        }
        
        let res = selectedProject.editTodo(editTodoData, todoId);
        
        // Guardar cambios en Local Storage
        this.saveProjectsToStorage();
        
        return res;
    }

    getProject(projectId) {
        let selectedProject = this.projects.find(project => project.id === projectId);
        return selectedProject;
    }


    clearAllData() {
        this.storageManager.clearProjects();
        this.projects = [];
        console.log('Todos los datos han sido eliminados');
    }


    getStorageInfo() {
        return this.storageManager.getStorageInfo();
    }
}

export { Controller };