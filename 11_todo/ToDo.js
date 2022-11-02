export default class ToDo extends EventTarget {
    constructor(titel, erledigt = false) {
        super()
        this.titel = titel
        this.erledigt = erledigt

        // create ui element
        const TASK = document.createElement('div')
        TASK.classList.add('task')

        // set task state on UI
        if (this.erledigt) TASK.classList.add('completed')
        else TASK.classList.remove('completed')
        TASK.setAttribute('completed', this.erledigt)

        // create checkbox
        const TASK_CHECK = document.createElement('input')
        TASK_CHECK.setAttribute('type', 'checkbox')
        TASK_CHECK.checked = this.erledigt

        TASK_CHECK.addEventListener('change', e => {
            this.erledigt = TASK_CHECK.checked

            // set task state on UI
            if (this.erledigt) TASK.classList.add('completed')
            else TASK.classList.remove('completed')
            TASK.setAttribute('completed', this.erledigt)

            this.dispatchEvent(new UIEvent('taskCompletedChange', {
                detail: {
                    completed: this.erledigt
                }
            }))
        })

        // create title
        const TASK_TITLE = document.createElement('p')
        TASK_TITLE.innerText = this.titel

        // create delete button
        const TASK_DELETE_BTN = document.createElement('button')
        TASK_DELETE_BTN.innerText = 'Löschen'

        TASK_DELETE_BTN.addEventListener('click', e => {
            this.dispatchEvent(new UIEvent('taskDelete'))
            TASK.remove()
            this.element = null
        })

        // append children
        TASK.append(TASK_CHECK, TASK_TITLE, TASK_DELETE_BTN)

        // set task element
        this.element = TASK
    }
}