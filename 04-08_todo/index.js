import ToDo from './ToDo.js'

// UI elements
const UI = {
    input: document.querySelector('#input_element'),
    tasks: document.querySelector('#tasks'),
    num_tasks: document.querySelector('#num_tasks'),
    btn_delete_completed: document.querySelector('#btn_delete_completed')
}

// todo list
const TODOS = []

// create elements
createToDo('Zugticket kaufen')
createToDo('Wäsche waschen', true)
createToDo('Hausaufgaben machen', true)

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
    TODOS.filter(td => td.erledigt === true).forEach(td => {
        td.element.remove() // remove ui element
        TODOS.splice(TODOS.findIndex(_td => _td == td), 1) // remove array element
    })
})

// create a todo
function createToDo(taskTitle, done = false) {
    // create new todo
    const NEW_TODO = new ToDo(taskTitle, done)

    // listen for events
    NEW_TODO.addEventListener('taskCompletedChange', updateTaskCount)
    NEW_TODO.addEventListener('taskDelete', () => {
        // remove todo from list
        TODOS.splice(TODOS.findIndex(td => td === NEW_TODO), 1)
        updateTaskCount()
    })

    // push todo to global array and UI
    TODOS.push(NEW_TODO)
    UI.tasks.append(NEW_TODO.element)

    updateTaskCount()
}

// update text displaying task count
function updateTaskCount() {
    const numOpenTodos = TODOS.length - TODOS.reduce((a, b) => a + b.erledigt, 0)
    UI.num_tasks.innerText =
        numOpenTodos == 0 ? `Keine offene Todo's`
            : numOpenTodos == 1 ? `1 offenes Todo`
                : `${numOpenTodos} offene Todo's`
}

// start
updateTaskCount()