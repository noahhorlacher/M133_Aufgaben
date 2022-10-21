const INPUT_NAME = document.querySelector('#input_name')

INPUT_NAME.value = oldValue = 'Elke Hinz'
document.querySelector('#btn_get').addEventListener('click', () => {
    document.querySelector('#txt_result').innerText = `Neuer Name: ${INPUT_NAME.value.replace('Hinz', 'Kunz, geb. Hinz')}`
})