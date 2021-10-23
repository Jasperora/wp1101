var todoInput = document.getElementsByClassName("todo-app__input"),
  todoFooter = document.getElementsByClassName("todo-app__footer"),
  todoList = document.getElementById("todo-list"),
  todoCount = document.getElementsByClassName("todo-app__total"),
  allButton = document.getElementById("all"),
  activeButton = document.getElementById("active"),
  completedButton = document.getElementById("completed"),
  cleanButton = document.getElementsByClassName("todo-app__clean"),
  clear = document.getElementById("clean");

var count = 0,
  all = 0,
  finishCount = 0;

function showCount() {
  var text = count + " left";
  todoCount[0].innerText = text;
}

function addTodoItem() {
  todoInput[0].addEventListener("keydown", function (e) {
    if (
      e.code === "Enter" &&
      todoInput[0].value !== undefined &&
      todoInput[0].value !== ""
    ) {
      showTodoList();
      showFooter();
      addListItem();
      count++;
      all++;

      checkCount();
      todoInput[0].value = "";
    }
  });
}

function showTodoList() {
  todoList.classList.remove("hide");
}

function showFooter() {
  todoFooter[0].classList.remove("hide");
}

function checkCount() {
  if (all === 0) {
    todoList.classList.add("hide");
    todoFooter[0].classList.add("hide");
  }
  if (finishCount === 0) {
    clear.classList.add("hidden");
  } else {
    clear.classList.remove("hidden");
  }
  showCount();
}

function addListItem() {
  let item = document.createElement("li"),
    div = document.createElement("div"),
    input = document.createElement("input"),
    label = document.createElement("label"),
    text = document.createElement("h1");
  todoList.appendChild(item);
  item.classList.add("todo-app__item");
  div.classList.add("todo-app__checkbox");
  input.type = "checkbox";
  input.id = all;
  label.for = all;
  text.innerText = todoInput[0].value;
  text.classList.add("todo-app__item-detail");
  item.appendChild(div);
  div.appendChild(input);
  div.appendChild(label);
  item.appendChild(text);

  let finished = false;
  div.addEventListener("click", function () {
    input.checked = !input.checked;
    finished = !finished;
    if (finished) {
      text.classList.add("finished");
      count--;
      finishCount++;
      checkCount();
    }
    if (!finished) {
      text.classList.remove("finished");
      count++;
      finishCount--;
      checkCount();
    }
  });

  let img = document.createElement("img");
  img.src = "./img/x.png";
  item.addEventListener("mouseover", function () {
    img.classList.add("todo-app__item-x");
    item.appendChild(img);
  });
  img.addEventListener("click", function () {
    todoList.removeChild(item);
    all--;
    if (!finished) count--;
    if (finished) finishCount--;
    checkCount();
  });
}

function showAll() {
  for (let i = 0; i < todoList.children.length; i++) {
    todoList.children[i].classList.remove("hide");
  }
  checkCount();
}

function showActive() {
  for (let i = 0; i < todoList.children.length; i++) {
    if (hasClass(todoList.children[i].children[1], "finished"))
      todoList.children[i].classList.add("hide");
    else {
      todoList.children[i].classList.remove("hide");
    }
  }
  checkCount();
}

function showCompleted() {
  for (let i = 0; i < todoList.children.length; i++) {
    if (hasClass(todoList.children[i].children[1], "finished")) {
      todoList.children[i].classList.remove("hide");
    } else todoList.children[i].classList.add("hide");
  }
}

function clean() {
  let finish = 0;
  let tmp = todoList.children.length;
  for (let i = 0; i < tmp; i++) {
    if (hasClass(todoList.children[i].children[1], "finished")) {
      finish++;
    }
  }
  let a = [];
  let aCnt = 0;
  for (let i = 0; i < tmp; i++) {
    if (hasClass(todoList.children[i].children[1], "finished")) {
      a[aCnt] = todoList.children[i];
      aCnt++;
    }
  }
  for (let i = 0; i < aCnt; i++) {
    a[i].remove();
  }
  all -= finish;
  count = all;
  finishCount = 0;
  checkCount();
}

function hasClass(element, cls) {
  return element.className.indexOf(cls) > -1;
}

function handleButton() {
  allButton.addEventListener("click", () => {
    showAll();
  });
  activeButton.addEventListener("click", () => {
    showActive();
  });
  completedButton.addEventListener("click", () => {
    showCompleted();
  });
  cleanButton[0].addEventListener("click", () => {
    clean();
    checkCount();
  });
}

addTodoItem();
handleButton();
