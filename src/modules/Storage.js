import TodoList from "./TodoList";


export default class Storage {
    static setTodoList(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    static getTodoList() {
        const todoList = JSON.parse(localStorage.getItem('tasks') || '[]');
        return todoList;
    }

}