export function createIUProject(project) { 

    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');

    const projectName = document.createElement('h3');
    projectName.textContent = project.name;

    const todosContainer = document.createElement('div');
    todosContainer.classList.add('todosContainer');

    const button = document.createElement('button');
    button.textContent = 'Add To-do';
    button.classList.add('add-todo')

    
    projectDiv.appendChild(projectName);
    projectDiv.appendChild(button);
    projectDiv.appendChild(todosContainer);

    return projectDiv;

}

