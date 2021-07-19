const taskContainer = document.querySelector(".task__container");
console.log(taskContainer);

let globalStore = [];

const newcard = ({
    id,
    imageurl,
    tasktitle,
    taskdescription,
    tasktype,
}) => ` <div class="col-md-6 col-lg-4" id=${id}>
<div class="card">
    <div class="card-header d-flex justify-content-end gap-2 ">
        <button type="button" id=${id} class="btn btn-outline-success rounded" onclick="editCard.apply(this, arguments)"><i class="fas fa-pencil-alt" id=${id} onclick="editCard.apply(this, arguments)"></i></button>
        <button type="button" id=${id} class="btn btn-outline-danger rounded" onclick="deleteCard.apply(this, arguments)"><i class="far fa-trash-alt" id=${id} onclick="deleteCard.apply(this, arguments)"></i></button>
    </div>
        <img src=${imageurl} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${tasktitle}</h5>
          <p class="card-text">${taskdescription}</p>
          <a href="#" class="btn btn-primary">${tasktype}</a>
        </div>
    <div class="card-footer text-muted ">
        <button type="button" id=${id} class="btn btn-outline-primary float-end rounded-pill">Open Task</button>
    </div>
  </div> 
</div>`;
 
const loadInitialTaskCards = () => {
     const getInitialData = localStorage.getItem("tasky");
     if (!getInitialData) return;

    const { cards } = JSON.parse(getInitialData);

    cards.map((cardObject) => {
    const createNewCard = newcard(cardObject);
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalStore.push(cardObject);
});
  
};

const updateLocalStorage = () => localStorage.setItem("tasky", JSON.stringify({cards: globalStore }));

const saveChnages = () => {
    const taskdata = {
        id:`${Date.now()}`, //unique number for cards id
        imageurl: document.getElementById("imageurl").value,
        tasktitle: document.getElementById("tasktitle").value,
        tasktype: document.getElementById("tasktype").value,
        taskdescription: document.getElementById("taskdescription").value,
    };

    const createNewCard = newcard(taskdata);

    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalStore.push(taskdata);

   updateLocalStorage();

};  

const deleteCard = (event) => {

    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);

  
    updateLocalStorage();

        if(tagname === "Button"){
            return taskContainer.removeChild(
            event.target.parentNode.parentNode.parentNode);
        }
            return taskContainer.removeChild(
            event.target.parentNode.parentNode.parentNode.parentNode
            );
};

const editCard = (event) => {
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    let parentElement;
    if(tagname === "Button"){
        parentElement =  event.target.parentNode.parentNode;
    }
    else{
       parentElement = event.target.parentNode.parentNode.parentNode
    }
    let taskTitle = parentElement.childNodes[5].childNodes[1];
    let taskDescription = parentElement.childNodes[5].childNodes[3];
    let taskType = parentElement.childNodes[5].childNodes[5];
    let submitButton = parentElement.childNodes[7].childNodes[1];

    taskTitle.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");
    submitButton.setAttribute("onclick", "saveEditchanges.apply(this, arguments)");
    submitButton.innerHTML = "Save Changes" ;
};

const saveEditchanges = (event) => {
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    let parentElement;
    if(tagname === "Button"){
        parentElement =  event.target.parentNode.parentNode;
    }
    else{
       parentElement = event.target.parentNode.parentNode.parentNode
    }
    let taskTitle = parentElement.childNodes[5].childNodes[1];
    let taskDescription = parentElement.childNodes[5].childNodes[3];
    let taskType = parentElement.childNodes[5].childNodes[5];
    let submitButton = parentElement.childNodes[7].childNodes[1];

    const updateData = {
        taskTitle: taskTitle.innerHTML,
        taskType: tasktype.innerHTML,
        taskDescription: taskDescription.innerHTML,
    };
    globalStore = globalStore.map((task) => {
        if (task.id === targetID) {
            return {
                id: task.id,
                imageurl: task.imageurl,
                taskTitle: updateData.taskTitle,
                taskType: updateData.taskType,
                taskDescription: updateData.taskDescription,
            };
        }
        return;
    });
    updateLocalStorage(); 
};