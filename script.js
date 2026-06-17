function generateIncompleteTodo(todoTitle){
    const listItem = document.createElement('li');
    //listItem.setAttribute("class", "item"); // weak system.
    listItem.classList.add("item");

    const inputItem = document.createElement('input');
    inputItem.setAttribute("type", "checkbox");

    const labelItem = document.createElement('label');
    labelItem.textContent = todoTitle;


    listItem.append(inputItem, labelItem);
    return listItem;
}


function generateCompleteTodo(todoTitle){
    const listItem = document.createElement('li');
    listItem.classList.add("item");

    const button = document.createElement('button');
    button.classList.add("delete");
    button.innerText = "Delete";
    button.onclick = deleteTask;

    listItem.append(todoTitle, " ",button);

    return listItem;
}


function completeTask(e){
    const elementToRemove = e.target.parentElement;

    const todoTitle = elementToRemove.querySelector("label").textContent;
    const completedTodo = generateCompleteTodo(todoTitle);

    document.getElementById("completeditems").appendChild(completedTodo);
    document.getElementById("items").removeChild(elementToRemove);

saveTasks();
}


function deleteTask (e){
const completeListContainer = document.querySelector(".complete-list ul");
const button = e.target;
const itemElement = button.parentNode;

completeListContainer.removeChild(itemElement);

  saveTasks();
}


function saveTasks() {
    const incompleteTasks = [];
    const completeTasks = [];

    document.querySelectorAll("#items li label").forEach((task) => {
        incompleteTasks.push(task.textContent);
    });

    document.querySelectorAll("#completeditems li").forEach((task) => {
        completeTasks.push(task.firstChild.textContent.trim());
    });

    localStorage.setItem("incompleteTasks", JSON.stringify(incompleteTasks));
    localStorage.setItem("completeTasks", JSON.stringify(completeTasks));
}

function loadTasks() {
    const incompleteTasks =
        JSON.parse(localStorage.getItem("incompleteTasks")) || [];

    const completeTasks =
        JSON.parse(localStorage.getItem("completeTasks")) || [];

    incompleteTasks.forEach((taskTitle) => {
        const task = generateIncompleteTodo(taskTitle);

        document.getElementById("items").appendChild(task);

        task.querySelector("input")
            .addEventListener("click", completeTask);
    });

    completeTasks.forEach((taskTitle) => {
        const task = generateCompleteTodo(taskTitle);

        document.getElementById("completeditems")
            .appendChild(task);
    });
}


const addToDoForm = document.querySelector("form");
addToDoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todoTitle = document.getElementById("new-task").value;
    const inCompleteTodoElement = generateIncompleteTodo(todoTitle);

    document.querySelector("#items").appendChild(inCompleteTodoElement);
    
    saveTasks();

   inCompleteTodoElement.querySelector("input").addEventListener("click", completeTask);

 addToDoForm.reset();

 
});

loadTasks();