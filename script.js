// select dom elements

const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
  

//try to load saved todos from local storage
const saved = localStorage.getItem('todos');
let todos = saved ? JSON.parse(saved) : [];

// create a function to save todos to local storage
function saveTodos() {  
    localStorage.setItem('todos', JSON.stringify(todos))
}

// create a function to dom nodes for a todo object and append to the list
function createTodoNode(todo, index){
const li =document.createElement('li');

    li.classList.toggle('completed', todo.completed);


// checkbox to toggle completed status
  const checkbox=document.createElement(`input`);
  checkbox.type=`checkbox`;
  checkbox.checked=!!todo.completed;
  checkbox.addEventListener("change", ()=>{
    todo.completed=checkbox.checked;
    // todo visual feedback strike through when completed
    textSpan.style.textDecoration=todo.completed?'line-through':"";
   
    saveTodos();
  })

  // span to hold todo text
  const textSpan=document.createElement("span")
  textSpan.textContent=todo.text;
  textSpan.style.margin=`0px 10px`;
  if(todo.completed){
    textSpan.style.textDecoration='line-through';
   } 
   // double click to edit todo text
    textSpan.addEventListener("dblclick",()=>{
        const newText=prompt("Edit todo:",todo.text)
        if(newText!==null){
           todo.text=newText.trim();
           textSpan.textContent=todo.text;
           saveTodos();
        
        }
    })

    // dlt button on dom
    const delbtn=document.createElement("button")
    delbtn.textContent="Delete";
    delbtn.addEventListener('click', () => {
        todos.splice(index, 1);
         saveTodos();
        render();
       
    })

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delbtn);
    return li;
  }


// create a function to render todos array 
function render() {
    list.innerHTML = '';

     if (todos.length === 0) {
        const empty = document.createElement('p');
        empty.textContent = 'No tasks yet. Add one!';
        list.appendChild(empty);
        return;
    }
// create each item and append to the list
todos.forEach((todo, index)=>{
 const node=createTodoNode(todo,index)
 list.appendChild(node)
});
}



function addTodo(){
    const text=input.value.trim();
    if(!text){
        return;
    }
// push a new todo object to todos array
    todos.push({text:text,completed: false})
    input.value='';
    render();
    saveTodos();
}

addBtn.addEventListener('click', addTodo);

input.addEventListener('keydown', (e)=>{
    if(e.key===`Enter`){
        addTodo();
    }
})
render();