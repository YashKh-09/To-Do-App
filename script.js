let input = document.getElementById("input"); // user input for to do task
const tasks = document.getElementById("Tasks"); // task that user added
let addbutton = document.getElementById("button"); // add button for adding to do
let removeall = document.getElementById("removeall"); // a button to remove all to do tasks
let all = document.getElementById("filter-all"); // filter button to show all to dos
let completed = document.getElementById("filter-completed"); // filter button to show only compeleted to dos
let pending = document.getElementById("filter-pending"); // filter button to show only pending to dos
let tasksync = []; // an empty array to add to dos init for local storage and for logic help

document.addEventListener("DOMContentLoaded", () => {
  get();
});

function get() {
  const storage = localStorage.getItem("tasks");
  if (storage) {
    local = JSON.parse(storage);
    local.forEach((todo) => {
      onreload(todo.task, todo.compelete);
    });
  }
}

function onreload(text, status) {
  text = text.trim();
  let task = document.createElement("li");
  task.classList.add(
    "flex",
    "justify-between",
    "items-center",
    "bg-gray-700",
    "px-4",
    "py-2",
    "rounded-lg",
    "shadow",
    "hover:bg-gray-600",
    "done" // this class helps in filtering the to do
  );
  const textsp = document.createElement("span");
  textsp.textContent = text;
  if (status == true) {
    textsp.classList.add("text-gray-400", "line-through", "completed");
  }
  const button = document.createElement("button");
  button.classList.add(
    "text-red-400",
    "hover:text-red-600",
    "cursor-pointer",
    "remove",
    "inline-block"
  );
  button.textContent = "X";
  task.appendChild(textsp);
  task.appendChild(button);
  tasks.appendChild(task);
  console.log(tasksync);
}

function set() {
  json = JSON.stringify(tasksync);
  localStorage.setItem("tasks", json);
}
// task() will add a to do task
function task() {
  inputvalue = input.value.trim();
  if (inputvalue === "") {
    alert("You can't add empty Task");
  } else {
    let task = document.createElement("li");
    task.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "bg-gray-700",
      "px-4",
      "py-2",
      "rounded-lg",
      "shadow",
      "hover:bg-gray-600",
      "done" // this class helps in filtering the to do
    );
    textspan = document.createElement("span");
    textspan.textContent = inputvalue;
    const button = document.createElement("button");
    button.classList.add(
      "text-red-400",
      "hover:text-red-600",
      "cursor-pointer",
      "remove",
      "inline-block"
    );
    button.textContent = "X";
    task.appendChild(textspan);
    task.appendChild(button);
    tasks.appendChild(task);
    input.value = "";
    tasksync.push({ task: inputvalue, compelete: false });
    console.log(tasksync);
  }
  set();
}

// adding functionality to addbutton
addbutton.addEventListener("click", () => {
  task();
});
// funtinality so that user can add to do with enter key
let keypress = input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    task();
  }
});

// adding functionality for completed and removing a task
tasks.addEventListener("click", (e) => {
  target = e.target.classList;
  if (target.contains("remove")) {
    const toremove = e.target.parentElement.querySelector("span").textContent;
    for (let i = 0; i < tasksync.length; i++) {
      if (tasksync[i] && tasksync[i].task == toremove) {
        tasksync.splice(i, 1);
        i--;
      }
    }
    console.log(tasksync);
    e.target.parentElement.remove();
    set()
  } else if (target.contains("done")) {
    to = e.target.querySelector("span").textContent;
    done = e.target.querySelector("span").classList;
    done.toggle("text-gray-400");
    done.toggle("line-through");
    done.toggle("completed");

    for (let i = 0; i < tasksync.length; i++) {
      if (tasksync[i] && tasksync[i].task == to) {
        tasksync[i].compelete = !tasksync[i].compelete;
      }
    }
    console.log(tasksync);
    set()
  }
});

// functionality for removing all to dos after clicking removeall button
removeall.addEventListener("click", () => {
  tasks.innerHTML = "";
  tasksync = [];
  console.log(tasksync);
  localStorage.clear()
});

// functionality so that user can edit task for mistype
tasks.addEventListener("dblclick", (j) => {
  if (j.target.tagName === "SPAN") {
    edit(j.target);
  }
});

// this is what happen when user dbl click on a to do
function edit(content) {
  const toedit = content.textContent;
  const foredit = document.createElement("input");
  foredit.type = "text";
  foredit.value = toedit;

  content.textContent = "";
  content.appendChild(foredit);
  foredit.focus();
  foredit.addEventListener("blur", () => {
    saveedit(content, foredit, toedit);
  });
  foredit.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      saveedit(content, foredit, toedit);
    }
  });
}

// this is how a to do will save after editing the task
function saveedit(toedit, fe, replace) {
  const save = fe.value;
  if (save == "") {
    toedit.removeChild(fe);
    toedit.textContent = replace;
  } else {
    toedit.removeChild(fe);
    toedit.textContent = save;
    const index = tasksync.findIndex((x) => {
      return x.task === replace;
    });
    if (index != -1) {
      tasksync[index].task = save;
    }
    console.log(tasksync);
    set()
  }
}
// adding functionality to all filter button
all.addEventListener("click", () => {
  Array.from(tasks.children).forEach((task) => {
    task.classList.remove("hidden");
  });
});

// adding functionality to completed filter button
completed.addEventListener("click", () => {
  Array.from(tasks.children).forEach((task) => {
    const check = task.querySelector("span").classList;
    if (!check.contains("completed")) {
      task.classList.add("hidden");
    }
    if (check.contains("completed")) {
      task.classList.remove("hidden");
    }
  });
});

// adding functionality to pending filter button
pending.addEventListener("click", () => {
  Array.from(tasks.children).forEach((task) => {
    const check = task.querySelector("span").classList;
    if (!check.contains("completed")) {
      task.classList.remove("hidden");
    }
    if (check.contains("completed")) {
      task.classList.add("hidden");
    }
  });
});
