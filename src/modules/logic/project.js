import {Todo} from './todo.js';


class Project {

    //Las propiedades del proyecto por ahora son su nombre:String y la lista de todos que posee todosList:Array

    constructor(name, todosList) {
        this.name = name;
        this.todosList = todosList;
    }



    addTodo(todoData) {

        const newTodo = new Todo(todoData.title, todoData.description, todoData.dueDate, todoData.priority, todoData.isCompleted);

        this.todosList.push(newTodo);


    }



}

export {Project};