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

    deleteTodo(todoTitle) {

        //Buscar en el array de todosList:Array iterando sobre cada uno de los ToDos del proyecto filtrado por nombre previamente por el gestor (metodo iterativo sobre los proyectos). Luego que se envía el mensaje al objeto proyecto que coincide con el nombre del proyecto que fue clickeado.

        let selectedTodoIndex = this.todosList.findIndex( (todo) => todo.title === todoTitle );
        
        this.todosList.splice(selectedTodoIndex, 1);

    }



}

export {Project};