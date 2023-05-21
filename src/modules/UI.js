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
            const modal = document.querySelector('#addTaskModal');
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
        // let tasks = JSON.parse(localStorage.getItem('tasks'));
        const ul = document.querySelector('.tasks-list');
        ul.innerHTML = '';
        tasks.forEach(task => {
            const index = tasks.indexOf(task);
            const li = document.createElement('li');
            li.classList.add('tasks-list__item');
            li.dataset.indexNumber = index;
            if (task.isCompleted === true) {
                li.innerHTML = `
                <div class="tasks-list__item-upper">
                    <div class="tasks-list__left">
                        <input type="checkbox" class="tasks-list__item-checkbox" ${task.isCompleted ? 'checked' : ''}>
                        <div class="tasks-list__item-title"><s>${task.title}</s></div>
                    </div>
                    <div class="tasks-list__right">
                        <label for="dueDate">Due Date: </label>
                        <input type="date" name="dueDate" id="dueDate" value="${task.dueDate}" disabled>
                            <img class="tasks-list__edit-icon" src="./images/edit-icon.png" alt="Edit-icon" width="27" height="27">
                            <img src="./images/bin-icon.png" alt="Edit-icon" width="27" height="27">
                    </div>
                </div>
                <div class="tasks-list__item-lower">
                    <details class="tasks-list__item-details">Details</details>
                </div>`;
            } else {
                li.innerHTML = `
            <div class="tasks-list__item-upper">
                <div class="tasks-list__left">
                    <input type="checkbox" class="tasks-list__item-checkbox" ${task.isCompleted ? 'checked' : ''}>
                    <div class="tasks-list__item-title" >${task.title}</div>
                </div>
                <div class="tasks-list__right">
                    <label for="dueDate">Due Date: </label>
                    <input type="date" name="dueDate" id="dueDate" value="${task.dueDate}" disabled>
                        <img class="tasks-list__edit-icon" src="./images/edit-icon.png" alt="Edit-icon" width="27" height="27">
                        <img src="./images/bin-icon.png" alt="Edit-icon" width="27" height="27">
                </div>
            </div>
            <div class="tasks-list__item-lower">
                <details class="tasks-list__item-details">Details</details>
            </div>`;
            }
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
            const modal = document.querySelector('#addTaskModal');
            modal.classList.remove('d-none');
            modal.classList.add('d-block');
        })
    }

    static closeAddTaskModal() {
        const closeModalBtn = document.querySelector('.btn-close');
        const cancelBtn = document.querySelector('.modal__cancel-btn');
        closeModalBtn.addEventListener('click', () => {
            const modal = document.querySelector('#addTaskModal');
            modal.classList.remove('d-block');
            modal.classList.add('d-none');
        })
        cancelBtn.addEventListener('click', () => {
            const modal = document.querySelector('#addTaskModal');
            modal.classList.remove('d-block');
            modal.classList.add('d-none');
        })
    }

    static closeEditTaskModal() {
        const closeModalBtn = document.querySelector('.editTaskModal-btn-close');
        const cancelBtn = document.querySelector('.editTaskModal-cancel-btn');
        closeModalBtn.addEventListener('click', () => {
            const modal = document.querySelector('#editTaskModal');
            modal.classList.remove('d-block');
            modal.classList.add('d-none');
        })
        cancelBtn.addEventListener('click', () => {
            const modal = document.querySelector('#editTaskModal');
            modal.classList.remove('d-block');
            modal.classList.add('d-none');
        })
    }



    static clearTasks() {
        const ul = document.querySelector('.tasks-list');
        ul.innerHTML = '';
        console.log(ul);
    }

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

    static updateIsCompleted() {
        let tasks = Storage.getTodoList();
        const checkboxes = document.querySelectorAll('.tasks-list__item-checkbox');
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('click', () => {
                const li = checkbox.parentElement.parentElement.parentElement;
                const title = checkbox.parentElement.children[1];
                const index = li.dataset.indexNumber;
                tasks[index].isCompleted = checkbox.checked;
                if (checkbox.checked === true) {
                    title.innerHTML = `<s>${title.textContent}</s>`
                } else {
                    title.innerHTML = title.textContent;
                }
                console.log(title.textContent);
                Storage.setTodoList(tasks);
            })
        })
    }

    static displayEditTaskModal() {
        let tasks = Storage.getTodoList();
        const editIcons = document.querySelectorAll('.tasks-list__edit-icon');
        editIcons.forEach((icon) => {
            icon.addEventListener('click', () => {
                const li = icon.parentElement.parentElement.parentElement;
                const index = li.dataset.indexNumber;
                const modal = document.querySelector('#editTaskModal');
                modal.dataset.indexNumber = index;
                const modalInputTitle = document.querySelector('.edit-task-modal-form__input-title');
                const modalInputDetails = document.querySelector('.edit-task-modal-form__input-details');
                const modalInputDueDate = document.querySelector('.edit-task-modal-form__input-dueDate');
                modal.classList.remove('d-none');
                modal.classList.add('d-block');
                const title = tasks[index].title;
                modalInputTitle.value = title;
                const details = tasks[index].details;
                modalInputDetails.value = details;
                const dueDate = tasks[index].dueDate;
                modalInputDueDate.value = dueDate;
                this.updateTask();
            })
        })
    }

    static updateTask() {
        let tasks = Storage.getTodoList();
        const modalSaveBtn = document.querySelector('.modal__edit-task-btn');
        modalSaveBtn.addEventListener('click', () => {
            const modal = document.querySelector('#editTaskModal');
            const index = modal.dataset.indexNumber;
            const modalInputTitleValue = document.querySelector('.edit-task-modal-form__input-title').value;
            const modalInputDetailsValue = document.querySelector('.edit-task-modal-form__input-details').value;
            const modalInputDueDateValue = document.querySelector('.edit-task-modal-form__input-dueDate').value;
            tasks[index].title = modalInputTitleValue;
            tasks[index].details = modalInputDetailsValue;
            tasks[index].dueDate = modalInputDueDateValue;
            Storage.setTodoList(tasks);
            modal.classList.remove('d-block');
            modal.classList.add('d-none');
            this.loadTasks();
        })
    }

}
