const inputBox = document.getElementById("input-box"); // Input field for entering tasks
const listContainer = document.getElementById("list-container"); // Container to display the list of tasks

/**
 * Adds a new task to the task list.
 */
const addTask = () => {
    const task = inputBox.value.trim(); // Get the input value and remove leading/trailing spaces

    if (!task) { // Check if the input is empty
        alert("Please enter a task"); // Alert the user to input a task
        return; // Stop the function if the input is invalid
    }

    const li = document.createElement("li"); // Create a new <li> element for the task
    li.innerHTML = `
        <label>
            <input type="checkbox" class="task-checkbox"> <!-- Checkbox for marking the task as completed -->
            <span>${task}</span> <!-- Display the task text -->
        </label>
        <span class="edit-btn">Edit</span> <!-- Edit button for modifying the task -->
        <span class="delete-btn">Delete</span> <!-- Delete button for removing the task -->
    `;

    listContainer.appendChild(li); // Append the newly created task to the list container

    // Add event listeners to the dynamically created elements
    const checkbox = li.querySelector("input"); // Reference to the checkbox
    const editBtn = li.querySelector(".edit-btn"); // Reference to the edit button
    const taskSpan = li.querySelector("span"); // Reference to the task text
    const deleteBtn = li.querySelector(".delete-btn"); // Reference to the delete button

    // Event listener: Mark the task as completed or uncompleted
    checkbox.addEventListener("click", function () {
        li.classList.toggle("completed", checkbox.checked); // Toggle the 'completed' class based on checkbox state
    });

    // Event listener: Edit the task text
    editBtn.addEventListener("click", function () {
        const update = prompt("Edit task:", taskSpan.textContent); // Prompt user to enter the new task text
        if (update !== null) { // Ensure the user didn't cancel the prompt
            taskSpan.textContent = update; // Update the task text
            li.classList.remove("completed"); // Remove the 'completed' class to reset completion state
        }
    });

    // Event listener: Delete the task
    deleteBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this task?")) { // Ask for user confirmation
            li.remove(); // Remove the task from the list
        }
    });

    inputBox.value = ""; // Clear the input box after adding the task
};

// Counters for completed and uncompleted tasks
const completedCounter = document.getElementById("completed-counter"); // Completed tasks counter
const uncompletedCounter = document.getElementById("uncompleted-counter"); // Uncompleted tasks counter

/**
 * Updates the task counters (completed and uncompleted tasks).
 */
function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length; // Count tasks with the 'completed' class
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length; // Count tasks without the 'completed' class

    completedCounter.textContent = completedTasks; // Display the completed task count
    uncompletedCounter.textContent = uncompletedTasks; // Display the uncompleted task count
}

// Update counters whenever a task state changes
checkbox.addEventListener("click", function () {
    li.classList.toggle("completed", checkbox.checked); // Toggle the 'completed' class based on checkbox state
    updateCounters(); // Recalculate and update the counters
});

// Update counters when editing a task
editBtn.addEventListener("click", function () {
    const update = prompt("Edit task:", taskSpan.textContent); // Prompt the user for a new task
    if (update !== null) { // Ensure the user didn't cancel
        taskSpan.textContent = update; // Update the task text
        li.classList.remove("completed"); // Remove 'completed' state for the updated task
        checkbox.checked = false; // Uncheck the checkbox
        updateCounters(); // Recalculate and update the counters
    }
});

// Update counters when deleting a task
deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) { // Confirm deletion
        li.remove(); // Remove the task
        updateCounters(); // Recalculate and update the counters
    }
});
