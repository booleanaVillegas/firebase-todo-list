import './style.css'
import { getTasks, addTask } from './firebase.js'

let tasks = []
await renderTasks()

const buttonTask = document.getElementById('create-todo')
buttonTask.addEventListener('click', async ()=> await handleClick())


async function renderTasks() {

  tasks = await getTasks()
  const todosContainer = document.querySelector('#to-dos-container')

  todosContainer.innerHTML = ''

  tasks.forEach(task => {
    const elem = document.createElement('li')
    elem.textContent = task.title

    todosContainer.append(elem)
  });

}

async function handleClick(){

  const inputTask = document.getElementById('input-todo')
  const inputText = inputTask.value

  await addTask(inputText)
  inputTask.value = ''
  await renderTasks()
}