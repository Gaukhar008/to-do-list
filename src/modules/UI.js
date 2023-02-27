import Task from './Task';
import Storage from './Storage';
import TodoList from './TodoList';

export default class UI {

    static validateInput(input) {
        if (input.value.trim() === '') {
            input.classList.add('red-border');
            return false;
        } else {
            input.classList.remove('red-border');
            return true;
        }
    }

    static validateModalInputs() {
        const title = document.querySelector('.modal-form__input-title');
        const details = document.querySelector('.modal-form__input-details');
        const dueDate = document.querySelector('.modal-form__input-dueDate');

        if (this.validateInput(title) === true && this.validateInput(details) === true && this.validateInput(dueDate) === true) {
            return true;
        } else {
            return false;
        }
    }

    static getTaskFromInput() {
        const title = document.querySelector('.modal-form__input-title').value;
        const details = document.querySelector('.modal-form__input-details').value;
        const dueDate = document.querySelector('.modal-form__input-dueDate').value;
        return new Task(title, details, dueDate);
    }

    static addTaskToStorage() {
        if (this.validateModalInputs() === true) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const task = this.getTaskFromInput();
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            const modal = document.querySelector('.modal');
            modal.classList.remove('d-block');
            modal.classList.add('d-none');
        }
    }

    static createAddTaskBtn() {
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('button');
        btnWrapper.classList.add('w-100');
        btnWrapper.classList.add('text-center');
        btnWrapper.classList.add('py-4');
        btnWrapper.innerHTML = `<button type="button" class="add-task-btn btn btn-dark btn-lg" data-bs-toggle="modal"
        data-bs-target="#modalSheet">+ Add
        Task</button>`;
        return btnWrapper;
    }

    static loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(task => {
            const ul = document.createElement('ul');
            const li = document.createElement('li');
        });
    }

    static loadHomePage() {
        const mainContent = document.querySelector('main');
        mainContent.appendChild(this.createAddTaskBtn());
    }

    // Event Listeners

    static displayModal() {
        const modal = document.querySelector('.modal');
        const addTaskBtn = document.querySelector('.add-task-btn');
        addTaskBtn.addEventListener('click', () => {
            modal.classList.remove('d-none');
            modal.classList.add('d-block');
        })
    }

    static closeModal() {
        const modal = document.querySelector('.modal');
        const closeModalBtn = document.querySelector('.btn-close');
        const cancelBtn = document.querySelector('.modal__cancel-btn');
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('d-block');
            modal.classList.add('d-none');
        })
        cancelBtn.addEventListener('click', () => {
            modal.classList.remove('d-block');
            modal.classList.add('d-none');
        })
    }

    static addTask() {
        const modalAddTaskBtn = document.querySelector('.modal__add-task-btn');
        modalAddTaskBtn.addEventListener('click', () => {
            this.addTaskToStorage();
        })
    };

    static displayTask() {

    }
}



