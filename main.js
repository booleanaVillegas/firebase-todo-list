import './style.css'
import { getTasks, addTask, editDocument } from './firebase.js'

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
    if(task.completed) elem.style.textDecoration = 'line-through';
    elem.addEventListener('click',async ()=> {
      await editDocument(task.title , task.id);
      await renderTasks()
    })

    todosContainer.append(elem)
  });

}

async function handleClick() {

  const inputTask = document.getElementById('input-todo')
  const inputText = inputTask.value

  await addTask(inputText)
  inputTask.value = ''
  await renderTasks()
}