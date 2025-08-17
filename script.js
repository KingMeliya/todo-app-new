document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const categoryInput = document.getElementById('category-input');
    const priorityInput = document.getElementById('priority-input');
    const duedateInput = document.getElementById('duedate-input');
    const taskList = document.getElementById('task-list');
    const darkModeToggle = document.getElementById('dark-mode-checkbox');
    const filterInput = document.getElementById('filter-input');

    // Storage Keys
    const taskStorageKey = 'tasks_v2';
    const themeStorageKey = 'theme_v1';

    // --- Initial Setup ---
    loadTasks();
    applySavedTheme();

    // --- Event Listeners ---

    // Add a new task
    taskForm.addEventListener('submit', e => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            category: categoryInput.value.trim(),
            priority: priorityInput.value,
            dueDate: duedateInput.value
        };

        createTaskElement(newTask);
        saveTasks();
        taskForm.reset();
        priorityInput.value = 'medium';
        taskInput.focus();
    });

    // Task list actions (complete, delete, edit) via event delegation
    taskList.addEventListener('click', e => {
        const target = e.target;
        const taskItem = target.closest('li.task-item');
        if (!taskItem) return;

        if (target.matches('.complete-btn')) {
            taskItem.classList.toggle('completed');
            updateCompleteButtonText(taskItem);
            saveTasks();
        } else if (target.matches('.delete-btn')) {
            taskItem.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            taskItem.style.opacity = '0';
            taskItem.style.transform = 'translateX(20px)';
            setTimeout(() => {
                taskItem.remove();
                saveTasks();
            }, 300);
        } else if (target.matches('.edit-btn')) {
            toggleEditMode(taskItem);
        }
    });

    // Dark mode toggle
    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem(themeStorageKey, document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Filter tasks by category
    filterInput.addEventListener('input', e => {
        const filterText = e.target.value.toLowerCase().trim();
        document.querySelectorAll('#task-list .task-item').forEach(item => {
            const categorySpan = item.querySelector('.category');
            const category = categorySpan ? categorySpan.textContent.substring(1).toLowerCase() : '';
            const isVisible = category.includes(filterText);
            item.classList.toggle('hidden', !isVisible);
        });
    });

    // --- Core Functions ---

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.className = 'task-item new-task-animation'; // Add animation class
        li.dataset.id = task.id;
        if (task.completed) li.classList.add('completed');

        // Main content container
        const mainContent = document.createElement('div');
        mainContent.className = 'task-main-content';
        const taskTextSpan = document.createElement('span');
        taskTextSpan.className = 'task-text';
        taskTextSpan.textContent = task.text;
        mainContent.appendChild(taskTextSpan);

        // Metadata container
        const metaContainer = document.createElement('div');
        metaContainer.className = 'task-meta';
        if (task.category) {
            metaContainer.innerHTML += `<span class="meta-item category">#${task.category}</span>`;
        }
        if (task.priority) {
            metaContainer.innerHTML += `<span class="meta-item priority-${task.priority}">Prio: ${task.priority}</span>`;
        }
        if (task.dueDate) {
            const formattedDate = new Date(task.dueDate).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
            metaContainer.innerHTML += `<span class="meta-item due-date">Fällig: ${formattedDate}</span>`;
        }

        // Action buttons
        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';
        taskActions.innerHTML = `
            <button class="edit-btn">Bearbeiten</button>
            <button class="complete-btn">${task.completed ? 'Rückgängig' : 'Erledigt'}</button>
            <button class="delete-btn">Löschen</button>
        `;
        mainContent.appendChild(taskActions);

        li.appendChild(mainContent);
        if (metaContainer.hasChildNodes()) li.appendChild(metaContainer);

        taskList.appendChild(li);
    }

    function toggleEditMode(taskItem) {
        const taskTextSpan = taskItem.querySelector('.task-text');
        const mainContent = taskItem.querySelector('.task-main-content');
        const editButton = taskItem.querySelector('.edit-btn');
        const isEditing = mainContent.querySelector('.edit-input');

        if (isEditing) {
            const editInput = taskItem.querySelector('.edit-input');
            taskTextSpan.textContent = editInput.value;
            mainContent.removeChild(editInput);
            taskTextSpan.style.display = '';
            editButton.textContent = 'Bearbeiten';
            saveTasks();
        } else {
            const currentText = taskTextSpan.textContent;
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.className = 'edit-input';
            editInput.value = currentText;

            taskTextSpan.style.display = 'none';
            mainContent.insertBefore(editInput, taskTextSpan);
            editInput.focus();
            editButton.textContent = 'Speichern';

            editInput.addEventListener('keydown', e => {
                if (e.key === 'Enter') toggleEditMode(taskItem);
                if (e.key === 'Escape') { // Optional: cancel edit
                    mainContent.removeChild(editInput);
                    taskTextSpan.style.display = '';
                    editButton.textContent = 'Bearbeiten';
                }
            });
        }
    }

    function updateCompleteButtonText(taskItem) {
        const button = taskItem.querySelector('.complete-btn');
        button.textContent = taskItem.classList.contains('completed') ? 'Rückgängig' : 'Erledigt';
    }

    // --- LocalStorage & Theme Functions ---

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list .task-item').forEach(item => {
            const taskText = item.querySelector('.task-text').textContent;
            const categorySpan = item.querySelector('.category');
            const prioritySpan = item.querySelector('.priority-medium, .priority-low, .priority-high');
            const dueDateSpan = item.querySelector('.due-date');

            tasks.push({
                id: item.dataset.id,
                text: taskText,
                completed: item.classList.contains('completed'),
                category: categorySpan ? categorySpan.textContent.substring(1) : '',
                priority: prioritySpan ? prioritySpan.className.split(' ')[1].split('-')[1] : 'medium',
                dueDate: dueDateSpan ? new Date(dueDateSpan.textContent.replace('Fällig: ', '').split('.').reverse().join('-')).toISOString().split('T')[0] : ''
            });
        });
        localStorage.setItem(taskStorageKey, JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem(taskStorageKey)) || [];
        tasks.forEach(task => createTaskElement(task));
    }

    function applySavedTheme() {
        const savedTheme = localStorage.getItem(themeStorageKey);
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
    }
});
