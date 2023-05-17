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
            const tasks = Storage.getTodoList();
            const task = this.getTaskFromInput();
            tasks.push(task);
            Storage.setTodoList(tasks);
            // localStorage.setItem('tasks', JSON.stringify(tasks));
            const modal = document.querySelector('.modal');
            modal.classList.remove('d-block');
            modal.classList.add('d-none');
        }
    }

    static showModal() {
        const modal = document.querySelector('.modal');
        modal.classList.remove('d-none');
        modal.classList.add('d-block');
    }

    static hideModal() {
        const modal = document.querySelector('.modal');
        modal.classList.remove('d-block');
        modal.classList.add('d-none');
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

    static displayTaskDetails() {
        let tasks = Storage.getTodoList();
        const details = document.querySelectorAll('.tasks-list__item-details');
        details.forEach((item) => {
            item.addEventListener('click', () => {
                const li = item.parentElement.parentElement;
                const index = li.dataset.indexNumber;
                // const details = document.createElement('details');
                item.textContent = tasks[index].details;
                // li.appendChild(details);
            })
        })
        // const div = document.createElement('div');
        // div.textContent = tasks[index].details;
    }

    static loadTasks() {
        let tasks = Storage.getTodoList();
        console.log(tasks);
        // let tasks = JSON.parse(localStorage.getItem('tasks'));
        const ul = document.querySelector('.tasks-list');
        tasks.forEach(task => {
            const index = tasks.indexOf(task);
            const li = document.createElement('li');
            li.classList.add('tasks-list__item');
            li.dataset.indexNumber = index;
            li.innerHTML = `
            <div class="tasks-list__item-upper">
                <div class="tasks-list__left">
                    <div class="tasks-list__item-checkbox tasks-list__item-checkbox-checked"></div>
                    <div class="tasks-list__item-title">${task.title}</div>
                </div>
                <div class="tasks-list__right">
                    <input type="date">
                    <a href="/">
                        <img src="./images/edit-icon.png" alt="Edit-icon" width="30" height="30">
                    </a>
                    <a href="/">
                        <img src="./images/bin-icon.png" alt="Edit-icon" width="30" height="30">
                    </a>
                </div>
            </div>
            <div class="tasks-list__item-lower">
                <details class="tasks-list__item-details">Details</details>
            </div>`;
            ul.appendChild(li);
        });
        return ul;
    }

    static loadHomePage() {
        const mainContent = document.querySelector('main');
        const ul = document.createElement('ul');
        ul.classList.add('tasks-list');
        mainContent.appendChild(this.createAddTaskBtn());
        mainContent.appendChild(ul);
    }

    // Event Listeners

    static displayModal() {
        const addTaskBtn = document.querySelector('.add-task-btn');
        addTaskBtn.addEventListener('click', () => {
            this.showModal();
        })
    }

    static closeModal() {
        const closeModalBtn = document.querySelector('.btn-close');
        const cancelBtn = document.querySelector('.modal__cancel-btn');
        closeModalBtn.addEventListener('click', () => {
            this.hideModal();
        })
        cancelBtn.addEventListener('click', () => {
            this.hideModal();
        })
    }

    static clearTasks() {
        const ul = document.querySelector('.tasks-list');
        ul.innerHTML = '';
        console.log(ul);
    }

    // static addTask() {
    //     const modalAddTaskBtn = document.querySelector('.modal__add-task-btn');
    //     modalAddTaskBtn.addEventListener('click', () => {
    //         this.addTaskToStorage();
    //     })
    // };

    static displayTasks() {
        const modalAddTaskBtn = document.querySelector('.modal__add-task-btn');
        const mainContent = document.querySelector('main');
        mainContent.appendChild(this.loadTasks());
        this.displayTaskDetails();

        modalAddTaskBtn.addEventListener('click', () => {
            this.addTaskToStorage();
            this.clearTasks();
            mainContent.appendChild(this.loadTasks());
            this.displayTaskDetails();
        });
    }
}



