window.addEventListener('load', start)
// Adding the function start when the window is loaded will prevent the page from "refresh"

var namesRegistered = []
var inputName = null
var isEditing = false
var currentIndex = null

function start() {
  inputName = document.querySelector('#inputName')

  preventFormSubmit()
  activeInput()
  // This will ensure that, once loaded loaded, the input element will gain focus
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
    //The function preventDefault() will prevent the form from submitting
  }

  var form = document.querySelector('form')
  form.addEventListener('submit', handleFormSubmit)
  // When the form is submitted, the handleFormSubmit function will prevent it from going to the server
}

function activeInput() {
  function insertName(newName) {
    namesRegistered.push(newName)
  }

  function updateName(newName) {
    namesRegistered[currentIndex] = newName
  }

  function handleTyping(event) {
    let hasText = !!event.target.value && event.target.value.trim()

    if (!hasText) {
      event.target.value = ''
      return;
    }

    if (event.key === 'Enter') {
      if (isEditing) {
        updateName(event.target.value)
      } else {
        insertName(event.target.value)
        event.target.value = ''
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
      // console.log("some bullshit it's happening here")
      namesRegistered.splice(index, 1)
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