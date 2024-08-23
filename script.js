document.addEventListener('DOMContentLoaded', loadTasks);

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();
    
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    
    const li = document.createElement('li');
    li.textContent = taskText;
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit';
    editBtn.addEventListener('click', () => editTask(li));
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(li));
    
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    
    taskList.appendChild(li);
    storeTask(taskText);
    
    taskInput.value = '';
}

function editTask(taskItem) {
    const newTaskText = prompt('Edit task:', taskItem.firstChild.textContent);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        taskItem.firstChild.textContent = newTaskText;
        updateStoredTask(taskItem.firstChild.textContent, newTaskText);
    }
}

function deleteTask(taskItem) {
    taskList.removeChild(taskItem);
    removeStoredTask(taskItem.firstChild.textContent);
}

function storeTask(task) {
    let tasks = getStoredTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getStoredTasks() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function updateStoredTask(oldTask, newTask) {
    let tasks = getStoredTasks();
    const taskIndex = tasks.indexOf(oldTask);
    if (taskIndex !== -1) {
        tasks[taskIndex] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function removeStoredTask(task) {
    let tasks = getStoredTasks();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getStoredTasks();
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit';
        editBtn.addEventListener('click', () => editTask(li));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(li));
        
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        
        taskList.appendChild(li);
    });
}
