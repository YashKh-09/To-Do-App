let input = document.getElementById("input");
const tasks = document.getElementById("Tasks");
let addbutton = document.getElementById("button");
let removeall = document.getElementById("removeall");
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
    tasksync.push(inputvalue);
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
    let toremove = e.target.parentElement.querySelector('span').textContent
    index = tasksync.indexOf(toremove);
    tasksync.splice(index,1);
    console.log(tasksync);
    e.target.parentElement.remove();
  } else if (target.contains("done")) {
    done = e.target.firstElementChild.classList;
    done.toggle("text-gray-400");
    done.toggle("line-through");
    console.log(tasksync);
}
});
removeall.addEventListener("click", () => {
  tasks.innerHTML = "";
  tasksync = [];
  console.log(tasksync);
});

