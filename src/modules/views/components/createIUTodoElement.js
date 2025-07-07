import { formatDate } from '../../logic/formatDate.js';


export function createTodoElement(todoData, todoId) {
    // Crear el contenedor principal
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo-item new';
    todoDiv.setAttribute('todo-id', todoId);
    
    // Si está completado, añadir la clase correspondiente
    if (todoData.isCompleted === 'on') {
        todoDiv.classList.add('completed');
    }
    
    // Crear los elementos de información
    const title = document.createElement('h4');
    title.textContent = todoData.title;
    title.className = 'todo-title';
    
    const description = document.createElement('p');
    description.textContent = todoData.description;
    description.className = 'todo-description';
    
    const dueDate = document.createElement('p');
    dueDate.textContent = `Due: ${formatDate(todoData.dueDate)}`;
    dueDate.className = 'todo-date';
    
    const priority = document.createElement('p');
    priority.textContent = `Priority: ${todoData.priority}`;
    priority.className = 'todo-priority';
    priority.dataset.priority = todoData.priority.toLowerCase();
    
    const status = document.createElement('p');

    let statusText = todoData.isCompleted !== null ? 'Yes' : 'No'; 
    status.textContent = `Completed: ${statusText}`;
    status.className = 'todo-status';
    status.dataset.completed = todoData.isCompleted;

    
    // Crear contenedor para los botones
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'todo-actions';
    
    // Crear botones
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete To-do';
    deleteBtn.className = 'delete-todo';
    
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Completed';
    completeBtn.className = 'complete-todo';
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit To-do';
    editBtn.className = 'edit-todo';
    
    // Añadir botones al contenedor de acciones
    actionsDiv.appendChild(deleteBtn);
    actionsDiv.appendChild(completeBtn);
    actionsDiv.appendChild(editBtn);
    
    // Añadir todos los elementos al contenedor principal
    todoDiv.appendChild(title);
    todoDiv.appendChild(description);
    todoDiv.appendChild(dueDate);
    todoDiv.appendChild(priority);
    todoDiv.appendChild(status);
    todoDiv.appendChild(actionsDiv);
    
    // Eliminar la clase 'new' después de la animación
    setTimeout(() => {
        todoDiv.classList.remove('new');
    }, 500);
    
    return todoDiv;
} 