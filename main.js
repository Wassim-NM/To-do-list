// get name input field

const nameInput = document.getElementById('name');
nameInput.addEventListener('change', (event) => {
    console.log(event.target.value);
    console.log(nameInput.value);
    localStorage.setItem('name', nameInput.value);
});

const userName = localStorage.getItem('name') || '';
nameInput.value = userName;

// Activate the form

let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
const form = document.getElementById('new-todo-form');
form.addEventListener('submit', (event) => {
    event.preventDefault(); // To prevent the reload of the screen !!

    // console.log(event.target.content.value);
    // console.log(event.target.category.value);
    const todoItem = {
        id: new Date().getTime(),
        content: event.target.content.value,
        category: event.target.category.value,
        completed: false
    };
    todoList.push(todoItem);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    displayTodos()
});     

// Display the todo list
window.addEventListener('load', displayTodos);

 function displayTodos() {
    const todoDiv = document.getElementById('todo-list');
    todoDiv.innerHTML = '';
    todoList.forEach(todoElement => {
        const todoListContainer = document.createElement('div');
        todoListContainer.classList.add('todo-item');
        todoListContainer.classList.add('todo-item')
        if(todoElement.completed){
            todoListContainer.classList.add('done');
        }
        else{
            todoListContainer.classList.remove('done');
        }

        //checkbox
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');

        input.type = 'checkbox';
        input.checked = todoElement.completed; // True Or False
        span.classList.add('bubble')
        if(todoElement.category == 'personal'){
            span.classList.add('personel');
        }
        else{
            span.classList.add('business');
        }
        label.appendChild(input);
        label.appendChild(span);
        todoListContainer.appendChild(label);

        //content
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('todo-content');
        contentDiv.innerHTML = `<input type='text' value='${todoElement.content}' readonly>`
        todoListContainer.appendChild(contentDiv);

        // action buttons
        const btnContainer = document.createElement('div');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        editBtn.innerHTML = 'Edit';
        deleteBtn.innerHTML = 'Delete';
        btnContainer.classList.add('actions')
        editBtn.classList.add('edit');
        deleteBtn.classList.add('delete');
        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);
        todoListContainer.appendChild(btnContainer);

        //Adding the todo item to the todos list div
        todoDiv.appendChild(todoListContainer);
        
        //Activating Delete Button
        deleteBtn.addEventListener('click', (event)=>{
            todoList = todoList.filter(elt =>{
                if(elt.id !== todoElement.id){
                    return elt;
                }
            })
            localStorage.setItem('todoList', JSON.stringify(todoList));
            displayTodos();
        })

        //Activating Edit Button
        editBtn.addEventListener('click', (event) =>{
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
                    contentInput.value = todoElement.content;
                }
            })
        })

        //Activating checkBox
        input.addEventListener('change', (event) => {
            todoElement.completed = event.target.checked;
            localStorage.setItem('todoList', JSON.stringify(todoList));
            displayTodos()
        })
    });
 }