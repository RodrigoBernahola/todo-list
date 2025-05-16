class IAddTodo {

    // constructor(addTodoButton, acceptButton, cancelButton) {

    //     this.addTodoButton = addTodoButton;
    //     this.acceptButton = acceptButton;
    //     this.cancelButton = cancelButton;

    // }


    clickAddTodo(event, dialog) {

        console.log(event);

        dialog.showModal()

    }

    cancelAdding(dialog) {

        dialog.close()
        
    }




}



export { IAddTodo };