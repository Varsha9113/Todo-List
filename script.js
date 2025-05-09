// Select DOM elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Load saved todos from localStorage
document.addEventListener("DOMContentLoaded", loadTodos);

// Add a new todo
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const todoText = todoInput.value.trim();

  if (todoText !== "") {
    addTodoItem(todoText);
    saveToLocalStorage(todoText);
    todoInput.value = "";
  }
});

// Add a todo item to the DOM
function addTodoItem(todoText) {
  const li = document.createElement("li");
  li.textContent = todoText;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Delete";
  removeBtn.addEventListener("click", function () {
    removeTodoItem(li, todoText);
  });

  li.appendChild(removeBtn);
  todoList.appendChild(li);
}

// Remove a todo item
function removeTodoItem(li, todoText) {
  todoList.removeChild(li);
  removeFromLocalStorage(todoText);
}

// Save a todo to localStorage
function saveToLocalStorage(todoText) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Remove a todo from localStorage
function removeFromLocalStorage(todoText) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const updatedTodos = todos.filter((todo) => todo !== todoText);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

// Load todos from localStorage
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todoText) => addTodoItem(todoText));
}
