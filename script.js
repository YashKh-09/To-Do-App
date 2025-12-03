let input = document.getElementById("input");
const tasks = document.getElementById("Tasks");
let addbutton = document.getElementById("button");
let removeall = document.getElementById("removeall");
let all = document.getElementById("filter-all");
let completed = document.getElementById("filter-completed");
let pending = document.getElementById("filter-pending");
let tasksync = [];

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
      "done"
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
}
addbutton.addEventListener("click", () => {
  task();
});
let keypress = input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    task();
  }
});
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
  } else if (target.contains("done")) {
    to = e.target.querySelector("span").textContent;
    done = e.target.querySelector("span").classList;
    done.toggle("text-gray-400");
    done.toggle("line-through");
    done.toggle("completed");

    for (let i = 0; i < tasksync.length; i++) {
      if (tasksync[i] && tasksync[i].task == to) {
         tasksync[i].compelete = !tasksync[i].compelete
      }
    }
    console.log(tasksync);
  }
});
removeall.addEventListener("click", () => {
  tasks.innerHTML = "";
  tasksync = [];
  console.log(tasksync);
});

tasks.addEventListener("dblclick", (j) => {
  if (j.target.tagName === "SPAN") {
    edit(j.target);
  }
});

function edit(content) {
  let replace = content.textContent;
  const toedit = content.textContent;
  const foredit = document.createElement("input");
  foredit.type = "text";
  foredit.value = toedit;

  content.textContent = "";
  content.appendChild(foredit);
  foredit.focus();
  foredit.addEventListener("blur", () => {
    saveedit(content, foredit, replace);
  });
  foredit.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      saveedit(content, foredit, replace);
    }
  });
}

function saveedit(toedit, fe, replace) {
  save = fe.value;
  toedit.removeChild(fe);
  toedit.textContent = save;

  index = tasksync.indexOf(replace);
  tasksync[index] = save;
  console.log(tasksync);
}
all.addEventListener('click' , () => {
   Array.from(tasks.children).forEach(task => {
  const check = task.querySelector('span').classList
    task.classList.remove('hidden')
});
})
completed.addEventListener('click' , () => {
 Array.from(tasks.children).forEach(task => {
  const check = task.querySelector('span').classList
  if (!check.contains('completed')) {
    task.classList.add('hidden')
  }
  if (check.contains('completed')) {
    task.classList.remove('hidden')
  }
});
})
pending.addEventListener('click' , () => {
   Array.from(tasks.children).forEach(task => {
  const check = task.querySelector('span').classList
  if (!check.contains('completed')) {
    task.classList.remove('hidden')
  }
  if (check.contains('completed')) {
    task.classList.add('hidden')
  }
});
})

 