const inputField = document.querySelector(".inputField input");
const addTaskBtn = document.querySelector(".inputField button");
const task = document.querySelector(".tasks");

const deleteAllBtn = document.querySelector(".footer button");

inputField.onkeyup = () => {
  let inputText = inputField.value;
  if (inputText.trim() != 0) {
    addTaskBtn.classList.add("active");
  } else {
    addTaskBtn.classList.remove("active");
  }
};

addTaskBtn.onclick = () => {
  let inputText = inputField.value;
  let getLocalStorage = localStorage.getItem("Add Todo");
  if (getLocalStorage == null) {
    todoArr = [];
  } else {
    todoArr = JSON.parse(getLocalStorage);
  }
  todoArr.push(inputText);
  addTaskBtn.classList.remove("active");
  localStorage.setItem("Add Todo", JSON.stringify(todoArr));
  showTask();
};

const showTask = () => {
  let getLocalStorage = localStorage.getItem("Add Todo");
  if (getLocalStorage == null) {
    todoArr = [];
  } else {
    todoArr = JSON.parse(getLocalStorage);
  }
  if (todoArr.length == 0) {
    deleteAllBtn.classList.remove("active");
  } else {
    deleteAllBtn.classList.add("active");
  }
  const taskNum = document.querySelector(".taskNum");
  taskNum.textContent = todoArr.length;
  let newListItem = "";
  todoArr.forEach((i, index) => {
    newListItem += `<li>${i}<button class="btn btn-danger" onClick = "deleteTask(${index})" ><i class="fas fa-times"></i></button></li>`;
  });
  task.innerHTML = newListItem;
  inputField.value = "";
};

const deleteTask = (task) => {
  let getLocalStorage = localStorage.getItem("Add Todo");
  todoArr = JSON.parse(getLocalStorage);
  todoArr.splice(task, 1);
  localStorage.setItem("Add Todo", JSON.stringify(todoArr));
  showTask();
};

deleteAllBtn.onclick = () => {
  todoArr = [];
  localStorage.setItem("Add Todo", JSON.stringify(todoArr));
  showTask();
};
