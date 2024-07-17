const taskInput = document.getElementById('task-input');
const newTaskForm = document.getElementById('new-task-form');
const taskList = document.getElementById('task-list');

// Task Class
class Task {
    constructor(title) {
        this.title = title;
        this.completed = false;
    }
}

// ToDoList Class
class ToDoList {
    constructor() {
        this.tasks = [];
        this.loadTasks(); // Load tasks from local storage on initialization
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveTasks(); // Save the updated tasks to local storage
        this.renderTasks(); // Render the new task on the UI
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.renderTasks();
    }

    toggleTaskCompletion(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveTasks();
        this.renderTasks();
    }

    renderTasks() {
        taskList.innerHTML = ''; // Clear the task list

        this.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
                <span>${task.title}</span>
                <button data-index="${index}">X</button>
            `;
            taskList.appendChild(li);

            // Add event listeners to each task item
            li.querySelector('input[type="checkbox"]').addEventListener('change', () => {
                this.toggleTaskCompletion(index);
            });

            li.querySelector('button').addEventListener('click', () => {
                this.deleteTask(index);
            });
        });
    }

    // Load tasks from local storage
    loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            this.tasks = storedTasks;
        }
    }

    // Save tasks to local storage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}

const toDoList = new ToDoList();

// Handle form submission
newTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskTitle = taskInput.value;
    if (taskTitle) {
        toDoList.addTask(new Task(taskTitle));
        taskInput.value = ''; // Clear the input field
    }
});

toDoList.renderTasks(); // Render initial tasks on page load