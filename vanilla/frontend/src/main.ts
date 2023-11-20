import './style.css'

const ul = document.querySelector('ul')

const todos = await fetch('http://localhost:3000/todos').then((response) => response.json())

todos.forEach((todo: any) => {
	if (ul) {
		const li = document.createElement('li')

		li.textContent = todo.text
		li.setAttribute('class', 'py-2 px-4 text-lg')

		ul.appendChild(li)
	}
})
