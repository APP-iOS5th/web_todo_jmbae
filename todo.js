
// 돔트리 분석이 끝나면 동작하는 이벤트
document.addEventListener('DOMContentLoaded', function() {
  loadTodos()
})

// 엔터시 동작하는 이벤트
document.getElementById('todoInput').addEventListener('keyup',function(event) {
  if(event.keyCode === 13) {
      event.preventDefault()
      document.getElementById('addTodo').click()
  }
})

// 클릭시 동작하는 이벤트
document.getElementById('addTodo').addEventListener('click', function() {
  var value = document.getElementById('todoInput').value
  if (value) {
      addTodo(value)
      document.getElementById('todoInput').value = ''
      storeTodos()
  }
})

// 화면을 그려주는 함수
function addTodo(text) {
  var list = document.getElementById('todoList')

  var item = document.createElement('li')
  var spanElement = document.createElement('span')
  spanElement.classList.add('px-2')
  spanElement.innerText = text

  item.appendChild(spanElement)

  item.classList.add('list-group-item')

  var removeButton = document.createElement('button')
  var completeButton = document.createElement('button')

  completeButton.innerText = 'Complete'
  completeButton.classList.add('btn', 'btn-dark', 'btn-sm', 'float-end')
  completeButton.addEventListener('click', function() {
      item.style.setProperty('text-decoration', 'line-through')
  })

  removeButton.innerText = 'Remove'
  removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'float-end')
  removeButton.addEventListener('click', function() {
      item.parentNode.removeChild(item)
      storeTodos()
  })

  item.appendChild(completeButton)
  item.appendChild(removeButton)
  list.appendChild(item)
}

// 리스트에 저장하는 함수
function storeTodos() {
  var todos = []
  for (var i = 0; i < todoList.children.length; i++) {
      todos.push(todoList.children[i].querySelector('span').textContent.trim())
  }
  localStorage.setItem('todos', JSON.stringify(todos))
}

// 새로 로딩하는 함수
function loadTodos() {
  var todos = JSON.parse(localStorage.getItem('todos'))
  if(todos) {
      todos.forEach(function(todo) {
          addTodo(todo)
      })
  }
}