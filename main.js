let namesRegistered = []
let inputName = null
let currentIndex = null
let isEditing = false

window.addEventListener('load', () => {
  inputName = document.querySelector('#inputName')

  preventFormSubmit()
  // Adding this when the window is loaded will prevent the page from "refresh"
  activeInput()
  // This will ensure that, once loaded loaded, the input element will gain focus
  renderNames()
})


function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
    //The function preventDefault() will prevent the form from submitting
  }

  const form = document.querySelector('form')
  form.addEventListener('submit', handleFormSubmit)
  // When the form is submitted, the handleFormSubmit function will prevent it from going to the server
}

function activeInput() {
  function insertName(newName) {
    namesRegistered = [...namesRegistered, newName]
  }

  function updateName(newName) {
    namesRegistered[currentIndex] = newName
  }

  function handleTyping(event) {
    let hasText = !!event.target.value && event.target.value.trim()

    if (!hasText) {
      clearInput()
      return;
    }

    if (event.key === 'Enter') {
      if (isEditing) {
        updateName(event.target.value)
        clearInput()
      } else {
        insertName(event.target.value)
        clearInput()
      }

      isEditing = false
      renderNames()
    }
  }

  inputName.addEventListener('keyup', handleTyping)
  inputName.focus()
}

function renderNames() {
  function createRemoveButton(index) {
    function deleteItem() {
      namesRegistered = namesRegistered.filter((_, i) => i !== index)

      renderNames()
    }

    let removeButton = document.createElement('button')
    removeButton.classList.add('remove-buttons')
    removeButton.addEventListener('click', deleteItem)

    return removeButton
  }

  function createSpam(name, index) {
    function editItem() {
      inputName.value = name
      inputName.focus()

      isEditing = true
      currentIndex = index
    }

    let span = document.createElement('span')
    span.textContent = name.trim()

    span.addEventListener('click', editItem)

    return span;
  }

  let divNames = document.querySelector('#names-registereds')
  divNames.innerHTML = ''

  let ul = document.createElement('ul')

  for (let index = 0; index < namesRegistered.length; index++) {
    let currentName = namesRegistered[index];

    let li = document.createElement('li')
    let removeButton = createRemoveButton(index)
    let spanName = createSpam(currentName, index)

    li.append(removeButton, spanName)

    ul.appendChild(li)
  }

  divNames.appendChild(ul)
}

const clearInput = () => {
  inputName.value = ''
  inputName.focus()
}