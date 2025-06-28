class Todo {

    constructor(title, description, dueDate, priority, checklist) {
        this.title = title; //String
        this.description = description; //String
        this.dueDate = dueDate; //Date
        this.priority = priority; //String
        this.checklist = checklist; //Boolean
    }

    toggleChecklistState () {

        if (!this.checklist) {

            this.checklist = true;

        }   

        else {
            this.checklist = false;
        }

        return this.checklist;
    }

}

export {Todo};