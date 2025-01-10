document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");

  const backendUrl = "http://localhost:3000"; // URL of the backend server

  // Fetch tasks from the backend
  async function fetchTasks() {
    try {
      const response = await fetch(`${backendUrl}/tasks`);
      const tasks = await response.json();
      renderTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  // Render tasks on the page
  function renderTasks(tasks) {
    taskList.innerHTML = ""; // Clear the list
    tasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.className = "task-item";
      taskItem.innerHTML = `
              <span>${task.name}</span>
              <button class="delete-task" data-id="${index}">Delete</button>
          `;
      taskList.appendChild(taskItem);
    });
  }

  // Add a new task
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();

    if (taskText) {
      try {
        await fetch(`${backendUrl}/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: taskText }),
        });
        taskInput.value = "";
        fetchTasks(); // Refresh the list
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  });

  // Delete a task
  taskList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-task")) {
      const id = e.target.dataset.id; // Get task ID
      try {
        await fetch(`${backendUrl}/tasks/${id}`, {
          method: "DELETE",
        });
        fetchTasks(); // Refresh the list
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  });

  // Load tasks when the page is loaded
  fetchTasks();
});
