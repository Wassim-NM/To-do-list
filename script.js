// get the name input field by its id
// get the input value on the change event
// save the name value on the local storage

const name_input = document.getElementById('name');

name_input.addEventListener('change', (event)=>{
    localStorage.setItem('name', name_input.value)
} )

const user_name = localStorage.getItem('name') || '';
name_input.value = user_name;

//Activating the form
let todoList = JSON.parse(localStorage.getItem('todoList'))  || [];
const form = document.getElementById('new-todo-form');
form.addEventListener('submit', (event)=>{
    event.preventDefault(); //to prevent the reload of the screen
    
    // console.log(event.target.content.value)
    // console.log(event.target.category.value)
    const todo_item = {
        id: new Date().getTime(),
        completed: false,
        content: event.target.content.value,
        category: event.target.category.value
    }
    console.log(todo_item)
    todoList.push(todo_item);
    localStorage.setItem('todoList', JSON.stringify(todoList))
    displayTodos();
})

window.addEventListener('load', displayTodos);

function displayTodos(){
    const todosDiv = document.getElementById('todo-list');
    todosDiv.innerHTML = '';
    todoList.forEach(todoElement => {
        const todoContainer = document.createElement('div');
        todoContainer.classList.add('todo-item')
        if(todoElement.completed){
            todoContainer.classList.add('done');
        }
        else{
            todoContainer.classList.remove('done');
        }

        //checkbox
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');

        input.type = 'checkbox';
        input.checked = todoElement.completed; // true or false
        span.classList.add('bubble');
        if(todoElement.category == 'personal'){
            span.classList.add('personal')
        }
        else{
            span.classList.add('business')
        }
        label.appendChild(input);
        label.appendChild(span);
        todoContainer.appendChild(label);

        //content
        const contentDiv = document.createElement('div')
        contentDiv.classList.add('todo-content');
        contentDiv.innerHTML = `<input type='text' value='${todoElement.content}' readonly>`
        todoContainer.appendChild(contentDiv);

        //action buttons
        const buttonsContainer = document.createElement('div');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        editButton.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';
        buttonsContainer.classList.add('actions');
        editButton.classList.add('edit');
        deleteButton.classList.add('delete');
        buttonsContainer.appendChild(editButton);
        buttonsContainer.appendChild(deleteButton);
        todoContainer.appendChild(buttonsContainer);


        //Adding the todo item to the todos list div
        todosDiv.appendChild(todoContainer);
        //Activating delete button
        deleteButton.addEventListener('click', (event) =>{
            todoList = todoList.filter((elt) =>{
                if(elt.id !== todoElement.id){
                   return elt; 
                }
            })
            localStorage.setItem('todoList', JSON.stringify(todoList));
            displayTodos();
        })
        //Activating edit button
        editButton.addEventListener('click', (event) =>{
            const contentInput = contentDiv.querySelector('input');
            contentInput.removeAttribute('readonly');
            contentInput.focus();
            contentInput.addEventListener('blur', () => {
                contentInput.setAttribute('readonly', true);
                if (contentInput.value != ''){
                    todoElement.content = contentInput.value;
                    localStorage.setItem('todoList', JSON.stringify(todoList))
                    displayTodos();
                }
                else{
                    contentInput.value = todoElement.content
                }
            })
        })
        
        //Activating checkBox
        input.addEventListener('change', (event) => {
            todoElement.completed = event.target.checked;
            localStorage.setItem('todoList', JSON.stringify(todoList));
            displayTodos();
        })
        
    });
}