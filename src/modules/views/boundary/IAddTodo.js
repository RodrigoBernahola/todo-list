class IAddTodo {


    clickAddTodo(event, dialog) {

        console.log(event);

        dialog.showModal()

        return;

    }
    

    cancelAdding(dialog) {

        dialog.close()

        return;
        
    }


    extractData(event, dialog) {

        event.preventDefault();


        const form = dialog.querySelector('form');
        const formData = new FormData(form);

        //Extraer valores

        const title = formData.get('title');
        const description = formData.get('description') || '';
        const dueDate = formData.get('date');
        const priority = formData.get('priority');
        const isCompleted = formData.get('checklist') === 'on';

        if (!title || !dueDate || !priority) {

            return;

        }
    
        let res = {title, description, dueDate, priority, isCompleted};

        console.log(res);
        console.table(res);

        return res;

    }


    refreshIU(todoData, todosContainer) {


        console.log(todoData);
        console.log(todosContainer);

        const todoDiv = document.createElement('div');

        const todoTitle = document.createElement('p');
        todoTitle.textContent = todoData.title;
        todoDiv.appendChild(todoTitle);

        const todoDescription = document.createElement('p');
        todoDescription.textContent = todoData.description;
        todoDiv.appendChild(todoDescription);

        const todoDueDate = document.createElement('p');
        todoDueDate.textContent = todoData.dueDate;
        todoDiv.appendChild(todoDueDate);

        const todoPriority = document.createElement('p');
        todoPriority.textContent = todoData.priority;
        todoDiv.appendChild(todoPriority);

        const todoChecklist =  document.createElement('p');
        todoChecklist.textContent = todoData.isCompleted;
        todoDiv.appendChild(todoChecklist);

        todosContainer.appendChild(todoDiv);

        return;

    }


}


export { IAddTodo };