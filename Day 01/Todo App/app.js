const clear = document.querySelector(".clear");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const addToDoBtn = document.getElementById("add");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);

let id;
let toDoArr;

let data = localStorage.getItem("TODO");
if (data) {
  toDoArr = JSON.parse(data);
  id = toDoArr.length;
  loadToDo(toDoArr);
} else {
  toDoArr = [];
  id = 0;
}

function handleClear() {
  localStorage.clear();
  location.reload();
}

function handleAddToDo(e) {
  if (e.keyCode == 13 || e.type == "click") {
    const todo = input.value;
    if (!todo) return;

    addToDo(todo, id, false, false);
    toDoArr.push({
      name: todo,
      id: id,
      done: false,
      trash: false,
    });
    id++;
    input.value = "";

    localStorage.setItem("TODO", JSON.stringify(toDoArr));
  }
}

function handleTrashComplete(e) {
  let el = e.target;
  const elStatus = el.attributes.job.value;

  if (elStatus == "complete") {
    completeToDo(el);
  } else if (elStatus == "delete") {
    removeToDo(el);
  }

  localStorage.setItem("TODO", JSON.stringify(toDoArr));
}

function addToDo(todo, id, done, trash) {
  if (trash) return;

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const position = "beforeend";
  const text = `<li class="item">
                  <i class="check far ${DONE}" job="complete" id=${id}></i>
                  <p class="text ${LINE}">${todo}</p>
                  <i class="delete far fa-trash-alt" job="delete" id=${id}></i>
                </li>`;

  list.insertAdjacentHTML(position, text);
}

function completeToDo(el) {
  el.classList.toggle(CHECK);
  el.classList.toggle(UNCHECK);
  el.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  toDoArr[el.id].done = toDoArr[el.id].done ? false : true;
}

function removeToDo(el) {
  el.parentNode.parentNode.removeChild(el.parentNode);
  toDoArr[el.id].trash = true;
}

function loadToDo(arr) {
  arr.forEach((item) => {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

clear.addEventListener("click", handleClear);
list.addEventListener("click", handleTrashComplete);
document.addEventListener("keyup", handleAddToDo);
addToDoBtn.addEventListener("click", handleAddToDo);
