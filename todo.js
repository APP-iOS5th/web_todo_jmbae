// 돔트리 분석이 끝나면 동작하는 이벤트
document.addEventListener("DOMContentLoaded", function () {
	loadTodos()
})

function clickAddButton() {
	var value = document.getElementById("todoInput").value
	if (value) {
    const todoObject = saveNewTodo(value)
		addTodo(todoObject)
		document.getElementById("todoInput").value = ""
	}
}

// 엔터시 동작하는 이벤트
document
	.getElementById("todoInput")
	.addEventListener("keydown", function (event) {
		if (event.key == "Enter") {
			event.preventDefault()
			clickAddButton()
		}
	})

// 클릭시 동작하는 이벤트
document.getElementById("addTodo").addEventListener("click", clickAddButton)

// 화면을 그려주는 함수
function addTodo(todoObject) {
  const todoText = todoObject.text
  const todoDone = todoObject.done
  const todoDate = todoObject.date

  console.log(todoDate)

	var list = document.getElementById("todoList")

	var item = document.createElement("li")
  item.id = todoDate

	var spanElement = document.createElement("span")
	spanElement.classList.add("px-2")
	spanElement.innerText = todoText


	item.classList.add("list-group-item")

	var removeButton = document.createElement("button")
	var completeButton = document.createElement("button")

	completeButton.innerText = "Complete"
	completeButton.classList.add("btn", "btn-dark", "btn-sm", "float-end")
	completeButton.addEventListener("click", function () {
    toggleTodo(todoObject)
    loadTodos()
	})

  if(todoDone) {
    spanElement.style.setProperty("text-decoration", "line-through")
  } else {
    spanElement.style.removeProperty("text-decoration")
  }

	removeButton.innerText = "Remove"
	removeButton.classList.add("btn", "btn-danger", "btn-sm", "float-end")
	removeButton.addEventListener("click", function () {
    deleteTodo(todoObject)
    loadTodos()
	})

  item.appendChild(spanElement)
  item.appendChild(completeButton)
  item.appendChild(removeButton)  
  list.appendChild(item)
}

function saveNewTodo(value) {
  const todoObject = {text: value, done: false, date: new Date()}
  const todos = JSON.parse(localStorage.getItem("todos")) || []
  todos.push(todoObject);
  localStorage.setItem("todos", JSON.stringify(todos))
  return todoObject
}

function toggleTodo(todoObject) {
  updateTodo({...todoObject, done: !todoObject.done})
}

function deleteTodo(todoDeleteObject) {
  const todos = JSON.parse(localStorage.getItem("todos")) || []
  const newTodos = [];
  todos.forEach((todoObject) => {
    if(todoObject.date !== todoDeleteObject.date) {
      newTodos.push(todoObject)
    }
  });
  localStorage.setItem("todos", JSON.stringify(newTodos))
}

function updateTodo(todoUpdateObject) {
  const todos = JSON.parse(localStorage.getItem("todos")) || []
  todos.forEach((todoObject) => {
    if(todoObject.date === todoUpdateObject.date) {
      todoObject.done = todoUpdateObject.done
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos))
}

// 새로 로딩하는 함수
function loadTodos() {
	var todos = JSON.parse(localStorage.getItem("todos"))
  let count = 0;
	if (todos) {
    var list = document.getElementById("todoList")
    list.innerHTML = ''
		todos.forEach(function (todo) {
      if(todo.done) count++;
			addTodo(todo)
		})
	}
  document.getElementById('remainsCount').textContent = todos.length - count;
  document.getElementById('doneCount').textContent = count;
}
