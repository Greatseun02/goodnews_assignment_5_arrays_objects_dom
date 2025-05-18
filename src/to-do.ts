type Task = {
    text: string;
    category: string;
    completed: boolean;
};

const tasks: Task[] = [];

const taskForm = document.getElementById('taskForm') as HTMLFormElement;
const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const categoryInput = document.getElementById('categoryInput') as HTMLSelectElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, idx) => {
        const li = document.createElement('li');
        li.className = 'task' + (task.completed ? ' completed' : '');

        // Container for task name and category
        const textContainer = document.createElement('div');
        textContainer.style.display = 'flex';
        textContainer.style.flexDirection = 'column';

        // Task text
        const span = document.createElement('span');
        span.textContent = task.text;

        // Category below task name
        const cat = document.createElement('div');
        cat.className = 'category';
        cat.textContent = `${task.category}`;

        textContainer.appendChild(span);
        textContainer.appendChild(cat);

        // Done/Undo button
        const doneBtn = document.createElement('button');
        doneBtn.textContent = task.completed ? 'Undo' : 'Done';
        doneBtn.onclick = () => {
            task.completed = !task.completed;
            renderTasks();
        };

        // Delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => {
            tasks.splice(idx, 1);
            renderTasks();
        };

        li.appendChild(textContainer);
        li.appendChild(doneBtn);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

taskForm.onsubmit = (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    const category = categoryInput.value;
    if (text && category) {
        tasks.push({ text, category, completed: false });
        taskInput.value = '';
        categoryInput.value = '';
        renderTasks();
    }
};

renderTasks();