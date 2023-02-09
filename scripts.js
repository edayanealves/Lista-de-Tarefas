const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

const tasksContainer = document.querySelector('.tasks-container')

refreshTaskUsingLocalStorage();

const validateInput = () =>  inputElement.value.trim().lenghr > 0;

const handAddTask = () => {
    const inputIsValid = validateInput();

    if(!inputIsValid){
      return inputElement.classList.add("Error");
    }
    
    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item')

    const taskContent = document.createElement('p')
    taskContent.innerText = inputElement.value;

    taskContent.addEventListener('click', () => handleClick(taskContent))

    const deleteItem = document.createElement('i');
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt"); 

    deleteItem.addEventListener.apply('click', () =>
     handleDeleteClick(taskItemContainer, taskContent))

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);

    inputElement.value = "";

    updateLocasStorage ();
};

const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;

    for(const task of tasks) {
        const currentTaskBeingClicked = (task.firstChild.isSameNode(taskContent));
        if(task.firstChild.isSameNode(taskContent)){
            task.firstChild.classList.toggle("completed");

        }
    }
    updateLocasStorage ();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = tasksContainer.childNodes;

    for(const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

        if(currentTaskIsBeingClicked) {
            taskItemContainer.remove();
        }
        }
        updateLocasStorage ();
};

const handLeInputChange = () => {
    const inputValid = validateInput();

    if(inputIsValid) {
        return inputElement.classList.remove("error");
    }
};

const updateLocasStorage = () => {
    const tasks = tasksContainer.childNodes;


    const localStorageTasks = [...tasks].map(task => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains('Completed')

        return {description: content.innerText, isCompleted };
    });

    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));

};

const refreshTaskUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

    if(!tasksFromLocalStorage) return;
    
    for (const task of tasksFromLocalStorage){
        const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item')

    const taskContent = document.createElement('p')
    taskContent.innerText = task.description;  

    if(task.isCompleted){
        taskContent.classList.add("completed");
    }

    taskContent.addEventListener('click', () => handleClick(taskContent))

    const deleteItem = document.createElement('i');
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt"); 

    deleteItem.addEventListener.apply('click', () =>
     handleDeleteClick(taskItemContainer, taskContent))

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);

       
    }
};


refreshTaskUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener('change', () => handLeInputChange());  
