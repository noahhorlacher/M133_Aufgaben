document.querySelector('input[type="submit"]').addEventListener('click', e => {
    const EL = document.createElement('li')
    EL.innerText = document.querySelector('#input_element').value
    document.querySelector('ul').append(EL)
    document.querySelector('#input_element').value = ''
})