import {Todo} from './todo.js';


class Project {

    //Las propiedades del proyecto por ahora son su nombre:String y la lista de todos que posee todosList:Array

    constructor(name, todosList) {
        this.name = name;
        this.todosList = todosList;
    }



    addTodo(todoData) {

        let uuid = self.crypto.randomUUID();

        const newTodo = new Todo(todoData.title, todoData.description, todoData.dueDate, todoData.priority, todoData.isCompleted);

        newTodo.id = uuid;

        this.todosList.push(newTodo);

        return newTodo;
    }

    deleteTodo(todoId) {

        //Buscar en el array de todosList:Array iterando sobre cada uno de los ToDos del proyecto filtrado por id previamente por el gestor (metodo iterativo sobre los proyectos). Luego que se envía el mensaje al objeto proyecto que coincide con el id del proyecto que fue clickeado.

        let selectedTodoIndex = this.todosList.findIndex( (todo) => todo.id === todoId );
        
        this.todosList.splice(selectedTodoIndex, 1);

    }

    completeTodo(todoId) {

        let selectedTodo = this.todosList.find( (todo) => 
        todo.id === todoId);

        let checklistRes = selectedTodo.toggleChecklistState();

        return checklistRes;

    }

    editTodo(editTodoData, todoId) {

        let selectedTodo = this.todosList.find( (todo) => todo.id === todoId);

        let res = selectedTodo.editTodo(editTodoData);

        return res;
        
    }

}

export {Project};