class StorageManager {
    
    constructor() {
        // Clave principal bajo la cual se almacenan todos los proyectos
        this.PROJECTS_KEY = 'todoApp_projects';
    }

    saveProjects(projects) {
        try {
            // Convertir el array de proyectos a JSON string
            const projectsJSON = JSON.stringify(projects);
            
            // Guardar en Local Storage
            localStorage.setItem(this.PROJECTS_KEY, projectsJSON);
            
            console.log('Proyectos guardados exitosamente en Local Storage');
        } catch (error) {
            console.error('Error al guardar proyectos:', error);
        }
    }


    loadProjects() {
        try {
            // Intentar obtener los datos de Local Storage
            const projectsJSON = localStorage.getItem(this.PROJECTS_KEY);
            
            // Si no hay datos guardados, retornar array vacío
            if (!projectsJSON) {
                console.log('No hay proyectos guardados en Local Storage');
                return [];
            }
            
            // Convertir el JSON string de vuelta a array de objetos
            const projects = JSON.parse(projectsJSON);
            
            console.log('Proyectos cargados desde Local Storage:', projects);
            return projects;
            
        } catch (error) {
            console.error('Error al cargar proyectos:', error);
            return [];
        }
    }


    clearProjects() {
        try {
            localStorage.removeItem(this.PROJECTS_KEY);
            console.log('Proyectos eliminados de Local Storage');
        } catch (error) {
            console.error('Error al eliminar proyectos:', error);
        }
    }


    hasStoredProjects() {
        const projectsJSON = localStorage.getItem(this.PROJECTS_KEY);
        return projectsJSON !== null && projectsJSON !== undefined;
    }

    
    getStorageInfo() {
        try {
            const projectsJSON = localStorage.getItem(this.PROJECTS_KEY);
            
            return {
                hasData: projectsJSON !== null,
                dataSize: projectsJSON ? projectsJSON.length : 0,
                projectCount: projectsJSON ? JSON.parse(projectsJSON).length : 0
            };
        } catch (error) {
            console.error('Error al obtener información del storage:', error);
            return {
                hasData: false,
                dataSize: 0,
                projectCount: 0
            };
        }
    }
}

export { StorageManager };