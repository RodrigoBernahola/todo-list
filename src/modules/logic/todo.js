class Todo {

    constructor(title, description, dueDate, priority, notes, checklist) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checklist = checklist;
    }

    toggleChecklistState () {

       this.checklist = !this.checklist;

    }


}

export {Todo};