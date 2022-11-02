import ToDo from './ToDo.js'

let todos = []

// UI elements
const UI = {
    input: document.querySelector('#input_element'),
    tasks: document.querySelector('#tasks'),
    num_tasks: document.querySelector('#num_tasks'),
    btn_delete_completed: document.querySelector('#btn_delete_completed')
}

// create new todo on press enter
UI.input.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        // create new todo
        createToDo(UI.input.value)

        // reset input element
        UI.input.value = ''
    }
})

// delete completed tasks on click
UI.btn_delete_completed.addEventListener('click', e => {
    todos.filter(td => td.erledigt === true).forEach(td => {
        td.element.remove() // remove ui element
        todos.splice(todos.findIndex(_td => _td == td), 1) // remove array element
    })

    // update amount open tasks
    updateTaskCount()

    // update localstorage
    updateLocalStorage()
})

// create a todo
function createToDo(taskTitle, done = false) {
    // create new todo
    const NEW_TODO = new ToDo(taskTitle, done)

    // listen for events
    NEW_TODO.addEventListener('taskCompletedChange', updateTaskCount)
    NEW_TODO.addEventListener('taskDelete', () => {
        // remove todo from list
        todos.splice(todos.findIndex(td => td === NEW_TODO), 1)
        updateTaskCount()
        updateLocalStorage()
    })

    // push todo to global array and UI
    todos.push(NEW_TODO)
    UI.tasks.append(NEW_TODO.element)

    // sort todos
    todos.sort((a, b) => a.titel.localeCompare(b.titel))

    // clear todos from UI
    let items = [...UI.tasks.children]

    // reinject into UI
    items.sort((a, b) => a.innerText.localeCompare(b.innerText))
    UI.tasks.append(...items)

    updateTaskCount()

    // update localstorage
    updateLocalStorage()
}

// update text displaying task count
function updateTaskCount() {
    const numOpenTodos = todos.length - todos.reduce((a, b) => a + b.erledigt, 0)
    UI.num_tasks.innerText =
        numOpenTodos == 0 ? `Keine offene Todo's`
            : numOpenTodos == 1 ? `1 offenes Todo`
                : `${numOpenTodos} offene Todo's`

    // enable or disable btn_delete_completed button
    UI.btn_delete_completed.disabled = !todos.some(t => t.erledigt)
}

// update localstorage element 'todos' with all todos
function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos.map(todo => {
        return {
            title: todo.titel,
            erledigt: todo.erledigt
        }
    })))
}

// parse todos from localStorage
if (localStorage.getItem('todos')) {
    let todosToParse = JSON.parse(localStorage.getItem('todos'))
    for (let todo of todosToParse) createToDo(todo.title, todo.erledigt)
}

// start
updateTaskCount()