
        // --- CONFIG ---
        const API_URL = 'http://localhost:5000/api/tasks';

        // --- DOM Elements ---
        const taskInput = document.getElementById('taskInput');
        const addTaskBtn = document.getElementById('addTaskBtn');
        const taskList = document.getElementById('taskList');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const totalTasksSpan = document.getElementById('totalTasks');
        const completedTasksSpan = document.getElementById('completedTasks');

        // --- State ---
        let tasks = [];
        let currentFilter = 'all';

        // --- Core Functions ---

        // Fetches tasks from the server and then renders them
        async function fetchAndRenderTasks() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`Network response was not ok. Status: ${response.status}`);
                }
                tasks = await response.json();
                renderTasks();
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
                taskList.innerHTML = `<li class="empty-state"><h3>Error loading tasks</h3><p>Please ensure the backend server is running correctly.</p></li>`;
            }
        }

        // Renders tasks based on the current filter
        function renderTasks() {
            const filteredTasks = tasks.filter(task => {
                if (currentFilter === 'active') return !task.completed;
                if (currentFilter === 'completed') return task.completed;
                return true; // 'all'
            });

            taskList.innerHTML = ''; // Clear the list

            if (filteredTasks.length === 0) {
                let message = 'Add your first task to get started!';
                if (currentFilter === 'active') message = 'All tasks are completed. Great job!';
                if (currentFilter === 'completed') message = 'No tasks completed yet.';
                
                taskList.innerHTML = `
                    <li class="empty-state">
                        <div>📋</div>
                        <h3>${currentFilter === 'all' ? 'No tasks yet' : 'No tasks found'}</h3>
                        <p>${message}</p>
                    </li>`;
            } else {
                filteredTasks.forEach(task => {
                    const taskElement = document.createElement('li');
                    taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
                    taskElement.dataset.id = task.id;

                    taskElement.innerHTML = `
                        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                        <div class="task-content">
                            <div class="task-title">${task.title}</div>
                        </div>
                        <div class="task-actions">
                            <button class="btn-icon btn-delete">🗑️</button>
                        </div>
                    `;
                    taskList.appendChild(taskElement);
                });
            }
            
            updateStats();
            addEventListenersToTasks();
        }

        // --- API Communication ---
        
        async function addTask() {
            const title = taskInput.value.trim();
            if (!title) return;

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title })
                });

                if (!response.ok) throw new Error('Failed to add task');
                
                const newTask = await response.json();
                tasks.unshift(newTask); // Add to the beginning of the array for instant feedback
                renderTasks();
                
                taskInput.value = '';
                taskInput.focus();
            } catch (error) {
                console.error('Add task error:', error);
                alert('Could not add task. Please check the server connection.');
            }
        }

        async function toggleTask(id) {
            try {
                const response = await fetch(`${API_URL}/${id}/toggle`, { method: 'PATCH' });
                if (!response.ok) throw new Error('Failed to toggle task');

                const updatedTaskInfo = await response.json();
                const task = tasks.find(t => t.id === id);
                if (task) {
                    task.completed = updatedTaskInfo.completed;
                }
                renderTasks();
            } catch (error) {
                console.error('Toggle task error:', error);
            }
        }

        async function deleteTask(id) {
            if (!confirm('Are you sure you want to delete this task?')) return;
            try {
                const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Failed to delete task');
                
                tasks = tasks.filter(task => task.id !== id);
                renderTasks();
            } catch (error) {
                console.error('Delete task error:', error);
                alert('Could not delete task. Please check the server connection.');
            }
        }
        
        // --- UI Updates & Event Listeners ---
        
        function updateStats() {
            const total = tasks.length;
            const completed = tasks.filter(task => task.completed).length;
            totalTasksSpan.textContent = `Total: ${total} ${total === 1 ? 'task' : 'tasks'}`;
            completedTasksSpan.textContent = `Completed: ${completed} ${completed === 1 ? 'task' : 'tasks'}`;
        }

        function addEventListenersToTasks() {
            document.querySelectorAll('.task-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const taskId = parseInt(this.closest('.task-item').dataset.id);
                    toggleTask(taskId);
                });
            });
            document.querySelectorAll('.btn-delete').forEach(btn => {
                btn.addEventListener('click', function() {
                    const taskId = parseInt(this.closest('.task-item').dataset.id);
                    deleteTask(taskId);
                });
            });
        }
        
        function setupEventListeners() {
            addTaskBtn.addEventListener('click', addTask);
            taskInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') addTask();
            });
            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentFilter = btn.dataset.filter;
                    renderTasks();
                });
            });
        }

        // --- Initialize the App ---
        function init() {
            setupEventListeners();
            fetchAndRenderTasks();
        }

        init();
