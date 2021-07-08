const taskcontainer = document.querySelector(".task__container");
console.log(taskcontainer);

const newcard = ({
    id,
    imageurl,
    tasktitle,
    taskdescription,
    tasktype,
}) => ` <div class="col-md-6 col-lg-4" id=${id}>
<div class="card">
    <div class="card-header d-flex justify-content-end gap-2 ">
        <button type="button" class="btn btn-outline-success rounded"><i class="fas fa-pencil-alt"></i></button>
        <button type="button" class="btn btn-outline-danger rounded"><i class="far fa-trash-alt"></i></button>
    </div>
        <img src=${imageurl} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${tasktitle}</h5>
          <p class="card-text">${taskdescription}</p>
          <a href="#" class="btn btn-primary">${tasktype}</a>
        </div>
    <div class="card-footer text-muted ">
        <button type="button" class="btn btn-outline-primary float-end rounded-pill">Open Task</button>
    </div>
  </div> 
</div>`

const saveChnages = () => {
    const taskdata = {
        id:`${Date.now()}`, //unique number for cards id
        imageurl: document.getElementById("imageurl").value,
        tasktitle: document.getElementById("tasktitle").value,
        tasktype: document.getElementById("tasktype").value,
        taskdescription: document.getElementById("taskdescription").value,
    };

    const createnewcard = newcard(taskdata);

    taskcontainer.insertAdjacentHTML("beforeend", createnewcard);
};  