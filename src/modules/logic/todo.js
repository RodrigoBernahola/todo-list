class Todo {

    constructor(title, description, dueDate, priority, checklist) {
        this.title = title; //String
        this.description = description; //String
        this.dueDate = dueDate; //Date
        this.priority = priority; //String
        this.checklist = checklist; //Boolean
    }

    toggleChecklistState () {

       this.checklist = !this.checklist;

    }


}

export {Todo};