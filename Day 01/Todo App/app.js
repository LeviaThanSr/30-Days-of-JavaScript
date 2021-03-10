const clear = document.querySelector(".clear");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const addToDoBtn = document.getElementById("add");

function addToDo(todo) {
  const position = "beforeend";
  const text = `<li class="item">
  <i class="co far fa-circle" job="complete"></i><p class="text">${todo}</p><i class="delete far fa-trash-alt" job="delete"></i></li>`;

  list.insertAdjacentHTML(position, text);
}

function handleEnter(e) {
  if (e.keyCode == 13 || e.type == "click") {
    const todo = input.value;
    if (!todo) return;

    addToDo(todo);
    input.value = "";
  }
}

document.addEventListener("keyup", handleEnter);
addToDoBtn.addEventListener("click", handleEnter);
