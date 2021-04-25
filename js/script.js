//getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(`.inputField button`);
const todoList = document.querySelector(`.todoList`);
const pendCount = document.querySelector(`.pending`);
const deleteAll = document.querySelector(`.footer button`);
const wrapper = document.querySelector(`.wrapper`);

inputBox.addEventListener("keyup", function () {
  let userData = this.value; //getting user entered value
  if (userData.trim() != 0) {
    //if user values arent only spaces
    addBtn.classList.add(`active`);
  } else {
    addBtn.classList.remove(`active`);
  }
});

//show task if web is refresh
showTask();

function locStorage() {
  let getLocalStorage = localStorage.getItem("New Todo"); //getting local storage
  if (getLocalStorage == null) {
    // if local storage is null
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage); //transform js string to js object
  }
  return listArr;
}

function inputData() {
  let listArr = locStorage();
  let userData = inputBox.value; //getting user entered value
  listArr.push(userData); //pushing or adding user data
  localStorage.setItem(`New Todo`, JSON.stringify(listArr)); //transform js object to string
  showTask();
}

inputBox.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    inputData();  
  }
 })

//if user click on the add button
addBtn.addEventListener(`click`, ()=>inputData());

function showTask() {
  let listArr = locStorage();
  pendCount.textContent = listArr.length;
  if (listArr.length > 0) {
    deleteAll.classList.add(`active`);
  } else {
    deleteAll.classList.remove(`active`)
  }
  let listArrHTML = listArr.map((list, index) => {
    return /*html*/`
      <li class="list">${list}<span onclick="deleteBtn(${index})"><i class="fas fa-trash"></i></span></li>`
  }).join(``);
  todoList.innerHTML = listArrHTML;
  inputBox.value = ``; //when addbtn click value in input will null 
}

wrapper.addEventListener(`click`, function (e) {
  if (e.target.classList.contains(`list`)) {
    e.target.classList.toggle(`lineThrough`)
  }
 })

function deleteBtn(index) {
  let listArr = locStorage();
  listArr.splice(index, 1);
  localStorage.setItem(`New Todo`, JSON.stringify(listArr)); //transform js object to string
  showTask();
}

//delete All function
deleteAll.addEventListener(`click`, function () {
  let listArr = locStorage();
  listArr = [];
  localStorage.setItem(`New Todo`, JSON.stringify(listArr));
  showTask()
 })

