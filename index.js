// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
const pendingTasksNumb = document.querySelector(".pendingTasks");
const editBtn = document.querySelector(".icon2");
const delBtnn = document.querySelector(".todoList li span .icon")
// var editButton=document.querySelector(".icon2");

const baseUrl = "https://api.fake.rest/84c3a0b8-3df5-4af1-8e1f-a78ecae5e8e7";
let todoItems = [];


document.addEventListener("DOMContentLoaded", async () => {
  let response = await fetch(`${baseUrl}/getitem`, {
    method: "GET",
  });
  response = await response.json();
  if (response.success) {
    todoItems = response.data;
    console.log(todoItems);
    showTasks(todoItems);
  }
//   console.log(response);

//   fetch(`${baseUrl}/getTodos`, {
//     method: "GET",
//   })
//     .then((res) => {
//       return res.json();
//     })
//     .then((results) => {
//       if (results.success) {
//         todoItems = results.data;
//         showTasks(todoItems);
//       }
//     });
});
// deleteAllBtn.onclick= async()=>{

//   let response= await fetch('${baseUrl}/deleteitem', {
//   method: 'GET',
// });
//   response = await respone.json();
//   if(response.success)
//   {
//     todoItems =[];
//     console.log(response.data)
//   }
//   showTasks();
// }
inputBox.onkeyup = () => {
  let userEnteredValue = inputBox.value; //getting user entered value
  if (userEnteredValue.trim() != 0) {
    //if the user value isn't only spaces
    addBtn.classList.add("active"); //active the add button
  } else {
    addBtn.classList.remove("active"); //unactive the add button
  }
};
function addTodoItem(item) {
  // todoItems.push({ title: item, id: Math.random().toString() });
  // inputBox.value = "";

  showTasks(todoItems);
}
//add item to list
addBtn.onclick = async () => {
  let response = await fetch(`${baseUrl}/postItem`, {
    method:"POST",
    headers: {
    'Content-Type': 'application/json',
  },
    body:JSON.stringify({"title":inputBox.value}),
  });
  response = await response.json();
  if(response.success)
  {
    todoItems= response.data;
    console.log(todoItems);
  }

  addTodoItem(inputBox.value);
};

function showTasks(data = []) {
  let newList = "";
  data.forEach((item, index) => {
    newList += `<li class="bordered">${item.title}<span class="icon" id=${item.id}>D</span>
</li>`;
  });
  todoList.innerHTML = newList;
  data.forEach((item,index)=>{
     var li = document.querySelectorAll(".todoList li")

          editButton=document.createElement("span");
          editButton.innerText="Edit";
          editButton.className="icon2";
          editButton.setAttribute("id",`${item.id}`);
          li[index].appendChild(editButton);
          // console.log(li[index])


  })
 
  pendingTasksNumb.textContent = data.length;
  data.length > 0
    ? deleteAllBtn.classList.add("active")
    : deleteAllBtn.classList.remove("active");
}

//delete specific item
todoList.onclick = async (e) => {

inputBox.placeholder="Add your new todo";
  if(e.target.className==="icon")
  {
     let response = await fetch(`${baseUrl}/deleteOneItem/${e.target.id}`,{
     method: 'DELETE',
    });
  response = await response.json();
  if(response.success)
  {
    todoItems= response.data;
    // console.log("delclicked");
    showTasks(todoItems);
    console.log(todoItems)


  }
  }
  else if(e.target.className==="icon2")
  {
    inputBox.placeholder="enter your changes and click edit to save";
    if(inputBox.value!="")
    {
    let response = await fetch(`${baseUrl}/updateItem/${e.target.id}`,{
     method:"POST",
    headers: {
    'Content-Type': 'application/json',
  },
    body:JSON.stringify({"title":inputBox.value}),

    });
  response = await response.json();
  if(response.success)
  {
   
       todoItems= response.data;
       showTasks(todoItems);
      console.log(todoItems);
      // console.log(`${e.target.id}`)

  }
}}


  // console.log(e.target.className)
 
};


// editButton.onclick = ()=>{
 // let response = await fetch(`https://api.fake.rest/84c3a0b8-3df5-4af1-8e1f-a78ecae5e8e7/updateItem/${e.target.id}`,{
 //     method:"POST",
 //    headers: {
 //    'Content-Type': 'application/json',
 //  },
 //    body:JSON.stringify({"title":inputBox.value}),

 //    });
 //  response = await response.json();
 //  if(response.success)
 //  {
 //    todoItems= response.data;
 //    console.log(todoItems);
 //    showTasks(todoItems);
// console.log("hello");
 //  }
// };
//edit item 

///clear all

deleteAllBtn.onclick = async () => {
  let response= await fetch(`${baseUrl}/deleteitem`)
  response= await response.json();
  if(response.success)
  {
        todoItems = [];
         todoItems = response.data;
    console.log(todoItems);

  }

  showTasks();
};
