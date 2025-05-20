class IAddTodo {

    clickAddTodo(event, dialog) {

        console.log(event);

        dialog.showModal()

    }

    cancelAdding(dialog) {

        dialog.close()
        
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


}


export { IAddTodo };