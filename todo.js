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
		// storeTodos()
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
	var spanElement = document.createElement("span")
	spanElement.classList.add("px-2")
	spanElement.innerText = todoText

	item.appendChild(spanElement)

	item.classList.add("list-group-item")

	var removeButton = document.createElement("button")
	var completeButton = document.createElement("button")

	completeButton.innerText = "Complete"
	completeButton.classList.add("btn", "btn-dark", "btn-sm", "float-end")
	completeButton.addEventListener("click", function () {
    toggleTodo(todoObject)
	})

  if(todoDone) {
    item.style.setProperty("text-decoration", "line-through")
  } else {
    item.style.removeProperty("text-decoration")
  }

	removeButton.innerText = "Remove"
	removeButton.classList.add("btn", "btn-danger", "btn-sm", "float-end")
	removeButton.addEventListener("click", function () {
		item.parentNode.removeChild(item)
		storeTodos()
	})

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


function updateTodo(todoUpdateObject) {
  const todos = JSON.parse(localStorage.getItem("todos")) || []
  todos.forEach((todoObject) => {
    if(todoObject.date === todoUpdateObject.date) {
      console.log('비교 정상!')
      todoObject.done = todoUpdateObject.done
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos))
}



// 리스트에 저장하는 함수
function storeTodos() {
	var todos = []
	for (var i = 0; i < todoList.children.length; i++) {
		todos.push(todoList.children[i].querySelector("span").textContent.trim())
	}
	localStorage.setItem("todos", JSON.stringify(todos))
}

// 새로 로딩하는 함수
function loadTodos() {
	var todos = JSON.parse(localStorage.getItem("todos"))
	if (todos) {
		todos.forEach(function (todo) {
			addTodo(todo)
		})
	}
}
