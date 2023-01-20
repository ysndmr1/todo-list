//* Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//* Event Listener

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
//!local storage icin en son yazdim
document.addEventListener("DOMContentLoaded", getTodos);

//* Functions

function addTodo(event) {
  //* prevent form from submitting
  event.preventDefault();
  //* todo div
  if (todoInput.value.trim() === "") {
    alert("Please, enter new todo text!");
    return;
  }
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //* create list
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //*ADD TODO TO LOCAL STORAGE
  //! burasi en son yazildi
  saveLocalTodos(todoInput.value);
  //* completed button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
  //!inner text kullansaydim sadece text olarak alacakti
  //!o yuzden html kullndim
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //* trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //* append to list
  todoList.appendChild(todoDiv);

  //* clear todo input value
  todoInput.value = "";
  todoInput.focus();
}

function deleteCheck(e) {
  const item = e.target;
  //*DELETE TO DO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //! silme butonuna animasyon icin class ekle
    todo.classList.add("fall");
    removeLocalTodos(todo); //* local storage den kaldirmak icin
    //! animasyonun islemesi icin remove kaldirdim
    //! ama remove kaldirinca div kalkmadi
    //! inspect de hala gözukuyor
    //! bunun icin remo vu animasyondan sonra tamamlanmasi icin
    //! add event ile cagiracagiz
    // todo.remove();

    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //* CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//* LOCAL STORAGE

function saveLocalTodos(todo) {
  let todos;
  //* yazdiklarimiz kaldi mi diye kontrol
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //* create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //* completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
    //!inner text kullansaydim sadece text olarak alacakti
    //!o yuzden html kullndim
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //* trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //* append to list
    todoList.appendChild(todoDiv);
  });
}

//* LOCAL STORAGE REMOVE ICIN

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
