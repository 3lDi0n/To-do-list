document.addEventListener("DOMContentLoaded", function () {
    var totalTasks = 0;
    var completedTasks = 0;

    function addTask() {
        var taskInput = document.getElementById("taskInput");
        var taskList = document.getElementById("taskList");

        if (taskInput && taskInput.value.trim() === "") {
            alert("Don't forget to add the task");
            return;
        }

        totalTasks++;

        var taskItem = document.createElement("div");
        taskItem.className = "task-item";

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";

        var label = document.createElement("label");
        label.textContent = taskInput.value;

        var editButton = document.createElement("button");
        editButton.innerHTML = '<i class="bi bi-pencil"></i>';
        editButton.className = "edit-button";
        editButton.addEventListener("click", function () {
            editTask(label);
        });

        var removeButton = document.createElement("button");
        removeButton.innerHTML = '<i class="bi bi-trash"></i>';
        removeButton.className = "remove-button";
        removeButton.addEventListener("click", function () {
            removeTask(taskItem);
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(label);
        taskItem.appendChild(editButton);
        taskItem.appendChild(removeButton);

        taskList.appendChild(taskItem);

        taskInput.value = "";

        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                label.style.textDecoration = "line-through";
                completedTasks++;
                moveTaskToCompleted(taskItem);
            } else {
                label.style.textDecoration = "none";
                completedTasks--;
                moveTaskToTodoList(taskItem);
            }

            updateCounters();
        });

        updateCounters();
    }

    function editTask(label) {
        var newText = prompt("Edit task:", label.textContent);
        if (newText !== null) {
            label.textContent = newText;
        }
    }

    function removeTask(taskItem) {
        var taskList = document.getElementById("taskList");
        var completedTaskList = document.getElementById("completedTaskList");

        if (taskItem.parentNode === taskList) {
            // Removing task from the To-Do List
            totalTasks--;
        } else if (taskItem.parentNode === completedTaskList) {
            // Removing task from the Completed Tasks
            totalTasks--;
            completedTasks--;
        }

        taskItem.remove();
        updateCounters();
    }

    function removeAllTasks() {
        var taskList = document.getElementById("taskList");
        var completedTaskList = document.getElementById("completedTaskList");

        // Remove all tasks from the todo list
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        // Remove all tasks from the completed tasks list
        while (completedTaskList.firstChild) {
            completedTaskList.removeChild(completedTaskList.firstChild);
        }

        totalTasks = 0;
        completedTasks = 0;

        updateCounters();
    }

    function moveTaskToCompleted(taskItem) {
        var taskList = document.getElementById("taskList");
        var completedTaskList = document.getElementById("completedTaskList");

        taskList.removeChild(taskItem);
        completedTaskList.appendChild(taskItem);

        var checkbox = taskItem.querySelector(".task-checkbox");
        checkbox.removeEventListener("change", moveTaskToCompleted);
        checkbox.addEventListener("change", moveTaskToTodoList);

        var removeButton = taskItem.querySelector(".remove-button");
        removeButton.removeEventListener("click", removeTask);
        removeButton.addEventListener("click", function () {
            moveTaskToTodoList(taskItem);
        });
    }

    function moveTaskToTodoList(taskItem) {
        var taskList = document.getElementById("taskList");
        var completedTaskList = document.getElementById("completedTaskList");

        completedTaskList.removeChild(taskItem);
        taskList.appendChild(taskItem);

        var checkbox = taskItem.querySelector(".task-checkbox");
        checkbox.removeEventListener("change", moveTaskToTodoList);
        checkbox.addEventListener("change", moveTaskToCompleted);

        var removeButton = taskItem.querySelector(".remove-button");
        removeButton.removeEventListener("click", function () {
            moveTaskToTodoList(taskItem);
        });
        removeButton.addEventListener("click", removeTask);
    }

    function updateCounters() {
        var totalTasksElement = document.getElementById("totalTasks");
        var completedTasksElement = document.getElementById("completedTasksCount");

        totalTasksElement.textContent = totalTasks;
        completedTasksElement.textContent = completedTasks;
    }

    var addButton = document.querySelector("button");
    addButton.addEventListener("click", addTask);

    var taskInput = document.getElementById("taskInput");
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    var deleteAllButton = document.querySelector(".remove-all-button");
    deleteAllButton.addEventListener("click", removeAllTasks);

    // Attach the editTask function to the "Edit" buttons
    document.addEventListener("click", function (event) {
        var editButton = event.target.closest(".edit-button");
        if (editButton) {
            var taskItem = editButton.closest(".task-item");
            var label = taskItem.querySelector("label");
            editTask(label);
            event.stopPropagation(); // Prevent checkbox click event from firing
        }
    });

    document.addEventListener("click", function (event) {
        var checkbox = event.target.closest(".task-checkbox");
        if (checkbox) {
            checkbox.checked = !checkbox.checked;
            var taskItem = checkbox.closest(".task-item");
            var label = taskItem.querySelector("label");

            if (checkbox.checked) {
                label.style.textDecoration = "line-through";
                completedTasks++;
                moveTaskToCompleted(taskItem);
            } else {
                label.style.textDecoration = "none";
                completedTasks--;
                moveTaskToTodoList(taskItem);
            }

            updateCounters();
        }
    });

    document.addEventListener("click", function (event) {
        var taskItem = event.target.closest(".task-item");
        if (taskItem && !event.target.classList.contains("edit-button")) {
            var checkbox = taskItem.querySelector(".task-checkbox");

            if (!event.target.classList.contains("remove-button")) {
                checkbox.checked = !checkbox.checked;

                var label = taskItem.querySelector("label");
                if (checkbox.checked) {
                    label.style.textDecoration = "line-through";
                    completedTasks++;
                    moveTaskToCompleted(taskItem);
                } else {
                    label.style.textDecoration = "none";
                    completedTasks--;
                    moveTaskToTodoList(taskItem);
                }

                updateCounters();
            }
        }
    });

    updateCounters();
});
